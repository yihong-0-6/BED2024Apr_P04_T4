require('dotenv').config();
const express = require("express");
const sql = require("mssql");
const path = require("path");
const fs = require('fs');
const dbConfig = require("./dbconfig");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json'); // Import generated spec

// Controllers
const forumController = require("./BED/controllers/forumController");
const userController = require("./BED/controllers/usersController");
const articleController = require("./BED/controllers/articleController");
const movieController = require("./BED/controllers/movieController");
const adminController = require("./BED/controllers/adminController");

// Middlewares
const validateForum = require("./BED/middlewares/validateForum");
const validateUser = require("./BED/middlewares/validateUser");
const validateArticle = require("./BED/middlewares/validateArticle");
const { validateAdmin, verifyJWTadmin } = require("./BED/middlewares/validateAdmin");

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Function to get the last movie ID
async function getLastMovieID() {
  const query = 'SELECT TOP 1 ID FROM Movies ORDER BY ID DESC';
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(query);
    return result.recordset[0] ? result.recordset[0].ID : 0;
  } catch (err) {
    console.error('Error fetching last movie ID:', err);
    throw err;
  }
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  // Set the destination for uploaded files
  destination: function (req, file, cb) {
    cb(null, 'public/Images'); // Save files in the 'public/Images' directory
  },
  // Set the filename for uploaded files
  filename: async function (req, file, cb) {
    try {
      // Get the ID of the last movie in the database
      const lastMovieID = await getLastMovieID();
      // Increment the ID to create a new unique ID for the new movie
      const newMovieID = lastMovieID + 1;
      // Generate a new image name using the new movie ID and the original file extension
      const newImageName = `moviesimage${newMovieID}${path.extname(file.originalname)}`;
      // Call the callback function with the new image name
      cb(null, newImageName);
    } catch (err) {
      // Call the callback function with the error if any occurs
      cb(err);
    }
  }
});

// Initialize the multer upload configuration with the specified storage settings
const upload = multer({ storage: storage });

// Add movie endpoint
app.post('/movies/add', upload.single('image'), async (req, res) => {
  try {
    // Destructure request body to get movie details
    const { name, publishedYear, director, country, description, trailerUrl } = req.body;
    const image = req.file; // Get the uploaded image file

    // Check if any required field is missing
    if (!name || !publishedYear || !director || !country || !description || !trailerUrl || !image) {
      return res.status(400).send('Missing required fields'); // Return error if any field is missing
    }

    // Connect to the database
    const pool = await sql.connect(dbConfig);
    // Get the highest movie ID from the Movies table
    const result = await pool.request().query('SELECT MAX(ID) AS maxID FROM Movies');
    const maxID = result.recordset[0].maxID || 0; // Get the max ID, or 0 if no records exist
    const movieID = maxID + 1; // Calculate new movie ID

    // Create an object with the new movie data
    const movieData = {
      ID: movieID,
      Name: name,
      Published_Year: publishedYear,
      Director: director,
      Country: country,
      Description: description,
      TrailerUrl: trailerUrl,
      ImageUrl: `/Images/moviesimage${movieID}${path.extname(image.originalname)}` // Generate the image URL
    };

    // SQL query to insert the new movie data
    const query = `
      INSERT INTO Movies (ID, Name, Published_Year, Director, Country, Description, TrailerUrl, ImageUrl)
      VALUES (@ID, @Name, @Published_Year, @Director, @Country, @Description, @TrailerUrl, @ImageUrl)
    `;

    // Create a request and add the movie data as inputs
    const request = pool.request();
    Object.keys(movieData).forEach(key => {
      request.input(key, movieData[key]);
    });

    console.log('Executing query:', query); // Log the query
    console.log('With parameters:', movieData); // Log the parameters

    await request.query(query); // Execute the query
    res.status(200).send('Movie added successfully'); // Send success response
  } catch (error) {
    console.error('Error adding movie:', error); // Log any error
    res.status(500).send('Error adding movie: ' + error.message); // Send error response
  }
});

// Delete movie endpoint
app.delete('/movies/:id', async (req, res) => {
  const movieId = req.params.id; // Get movie ID from the URL parameters

  try {
    const pool = await sql.connect(dbConfig); // Connect to the database
    // Query to get the image URL of the movie to be deleted
    const result = await pool.request()
      .input('ID', sql.Int, movieId)
      .query('SELECT ImageUrl FROM Movies WHERE ID = @ID');

    if (result.recordset.length === 0) {
      return res.status(404).send('Movie not found'); // Return error if movie not found
    }

    const imageUrl = result.recordset[0].ImageUrl; // Get the image URL
    const imagePath = path.join(__dirname, 'public', imageUrl); // Construct the image path

    // Delete the movie from the database
    await pool.request()
      .input('ID', sql.Int, movieId)
      .query('DELETE FROM Movies WHERE ID = @ID');

    // Delete the image file from local storage if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).send('Movie and associated image deleted successfully'); // Send success response
  } catch (error) {
    console.error('Error deleting movie:', error); // Log any error
    res.status(500).send('Error deleting movie: ' + error.message); // Send error response
  }
});

// Fetch movies and countries
app.get("/movies/firstsix", movieController.getFirstSixMovies); // Route to get first six movies
app.get("/movies/:id", movieController.getMovieById); // Route to get a movie by ID
app.get("/movies", movieController.getAllMovies); // Route to get all movies

app.get("/countries", async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig); // Connect to the database
    const result = await connection.request().query("SELECT ID, CountryName, Description FROM Countries"); // Query to get all countries
    res.json(result.recordset); // Send the result as JSON
  } catch (err) {
    console.error("Error fetching countries:", err); // Log any error
    res.status(500).send("Error fetching countries"); // Send error response
  }
});

// Update country endpoint
app.put('/countries/:id', async (req, res) => {
  const countryId = req.params.id; // Get country ID from the URL parameters
  const { CountryName, Description } = req.body; // Destructure request body to get country details

  try {
    const pool = await sql.connect(dbConfig); // Connect to the database
    // SQL query to update the country details
    const query = `
      UPDATE Countries 
      SET CountryName = @CountryName, Description = @Description 
      WHERE ID = @ID
    `;
    await pool.request()
      .input('CountryName', sql.NVarChar, CountryName) // Add inputs for the query
      .input('Description', sql.NVarChar, Description)
      .input('ID', sql.Int, countryId)
      .query(query);

    res.status(200).send('Country updated successfully'); // Send success response
  } catch (error) {
    console.error('Error updating country:', error); // Log any error
    res.status(500).send('Failed to update country'); // Send error response
  }
});

// Update movie endpoint
app.put('/movies/:id', async (req, res) => {
  const movieId = req.params.id; // Get movie ID from the URL parameters
  const updates = req.body; // Get the updates from the request body

  let query = 'UPDATE Movies SET '; // Start constructing the SQL update query
  const fields = Object.keys(updates).map((key, index) => {
    return `${key} = @${key}`; // Map each update key to a query string
  });
  query += fields.join(', ') + ' WHERE ID = @ID'; // Join the fields and complete the query

  try {
    const pool = await sql.connect(dbConfig); // Connect to the database
    const request = pool.request();

    // Add inputs for the query
    Object.keys(updates).forEach(key => {
      request.input(key, updates[key]);
    });
    request.input('ID', sql.Int, movieId);

    console.log('Executing query:', query); // Log the query
    console.log('With parameters:', updates); // Log the parameters

    await request.query(query); // Execute the query
    res.sendStatus(200); // Send success response
  } catch (err) {
    console.error('Error updating movie:', err); // Log any error
    res.sendStatus(500); // Send error response
  }
});

// Get movie details endpoint
app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id; // Get movie ID from the URL parameters

  try {
    const pool = await sql.connect(dbConfig); // Connect to the database
    const result = await pool.request()
      .input('ID', sql.Int, movieId)
      .query('SELECT * FROM Movies WHERE ID = @ID'); // Query to get the movie details by ID

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]); // Send the movie details as JSON if found
    } else {
      res.sendStatus(404); // Send 404 if movie not found
    }
  } catch (err) {
    console.error('Error fetching movie details:', err); // Log any error
    res.sendStatus(500); // Send error response
  }
});


// Forum Routes
app.post('/Community/create', validateForum.forumValidation, forumController.createForum);
app.get('/Community', forumController.getAllForums);
app.get("/Community/forums", async (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "Community.html");
  res.sendFile(filePath);
});
app.get("/Community/id/:forumId", forumController.getForumById);
app.delete("/Community/remove/:forumId", forumController.deleteForum);

// User Routes
app.post("/users/account/login", userController.userLogin);
app.get("/users/login/:id", userController.getUserById);
app.post("/users/account", validateUser.validateUserAccount, userController.createUser);
app.put("/users/account/:id", userController.updateUser);
app.delete("/users/remove/:id", userController.deleteUser);
app.post("/users/forgotpassword/:email", userController.forgotPassword);
app.post("/users/verifyPassword", userController.confirmPassword);

// Registration and Login Routes
app.get("/registerUser", (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "mainsignup.html");
  res.sendFile(filePath);
});
app.get("/loginUser", (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "mainlogin.html");
  res.sendFile(filePath);
});

// Article Routes
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:ID", articleController.getArticleById);
app.put("/articles/:ID", validateArticle, articleController.updateArticle);
app.delete("/articles/:ID", articleController.deleteArticle);

// Admin Routes Yi Hong S10257222H
app.get("/admins/:email", adminController.getAdminsByEmail); //GET function to get admin data by email
app.get("/admins", adminController.getAllAdmins); //GET function to get all admin data in database
app.post("/admins/create", validateAdmin, adminController.createAdmin); //POST function to create new admin in database
app.post("/admins/login", adminController.adminLogin); //POST function to handle admin log in
app.delete("/admins/delete/:email", adminController.deleteAdmin); //DELETE function to delete admin data from email

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0);
});

// Start the server
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
});
