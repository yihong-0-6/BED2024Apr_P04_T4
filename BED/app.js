require('dotenv').config();
const express = require("express");
const sql = require("mssql");
const path = require("path");
const fs = require('fs');
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");

// Controllers
const forumController = require('./controllers/forumController');
const userController = require("./controllers/userController");
const articleController = require("./controllers/articleController");
const movieController = require('./controllers/movieController');
const adminController = require('./controllers/adminController');

// Middlewares
const validateForum = require("./middlewares/validateForum");
const validateUser = require("./middlewares/validateUser");
const validateArticle = require('./middlewares/validateArticle');
const { validateAdmin, verifyJWTadmin } = require("./middlewares/validateAdmin");

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
  destination: function (req, file, cb) {
    cb(null, 'public/Images');
  },
  filename: async function (req, file, cb) {
    try {
      const lastMovieID = await getLastMovieID();
      const newMovieID = lastMovieID + 1;
      const newImageName = `moviesimage${newMovieID}${path.extname(file.originalname)}`;
      cb(null, newImageName);
    } catch (err) {
      cb(err);
    }
  }
});
const upload = multer({ storage: storage });

// Add movie endpoint
app.post('/movies/add', upload.single('image'), async (req, res) => {
  try {
    const { name, publishedYear, director, country, description, trailerUrl } = req.body;
    const image = req.file;

    if (!name || !publishedYear || !director || !country || !description || !trailerUrl || !image) {
      return res.status(400).send('Missing required fields');
    }

    // Get the next movie ID from the database
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT MAX(ID) AS maxID FROM Movies');
    const maxID = result.recordset[0].maxID || 0;
    const movieID = maxID + 1;

    const movieData = {
      ID: movieID,
      Name: name,
      Published_Year: publishedYear,
      Director: director,
      Country: country,
      Description: description,
      TrailerUrl: trailerUrl,
      ImageUrl: `/Images/moviesimage${movieID}${path.extname(image.originalname)}`
    };

    const query = `
      INSERT INTO Movies (ID, Name, Published_Year, Director, Country, Description, TrailerUrl, ImageUrl)
      VALUES (@ID, @Name, @Published_Year, @Director, @Country, @Description, @TrailerUrl, @ImageUrl)
    `;

    const request = pool.request();
    Object.keys(movieData).forEach(key => {
      request.input(key, movieData[key]);
    });

    console.log('Executing query:', query);
    console.log('With parameters:', movieData);

    await request.query(query);
    res.status(200).send('Movie added successfully');
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).send('Error adding movie: ' + error.message);
  }
});

// Delete movie endpoint
app.delete('/movies/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('ID', sql.Int, movieId)
      .query('SELECT ImageUrl FROM Movies WHERE ID = @ID');

    if (result.recordset.length === 0) {
      return res.status(404).send('Movie not found');
    }

    const imageUrl = result.recordset[0].ImageUrl;
    const imagePath = path.join(__dirname, 'public', imageUrl);

    // Delete the movie from the database
    await pool.request()
      .input('ID', sql.Int, movieId)
      .query('DELETE FROM Movies WHERE ID = @ID');

    // Delete the image file from the local storage
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).send('Movie and associated image deleted successfully');
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).send('Error deleting movie: ' + error.message);
  }
});

// Fetch movies and countries
app.get("/movies/firstsix", movieController.getFirstSixMovies);
app.get("/movies/:id", movieController.getMovieById);
app.get("/movies", movieController.getAllMovies);

app.get("/countries", async (req, res) => {
  try {
    const connection = await sql.connect(dbConfig);
    const result = await connection.request().query("SELECT ID, CountryName, Description FROM Countries");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).send("Error fetching countries");
  }
});

app.put('/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  const updates = req.body;

  let query = 'UPDATE Movies SET ';
  const fields = Object.keys(updates).map((key, index) => {
    return `${key} = @${key}`;
  });
  query += fields.join(', ') + ' WHERE ID = @ID';

  try {
    const pool = await sql.connect(dbConfig);
    const request = pool.request();

    Object.keys(updates).forEach(key => {
      request.input(key, updates[key]);
    });
    request.input('ID', sql.Int, movieId);

    console.log('Executing query:', query);
    console.log('With parameters:', updates);

    await request.query(query);
    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.sendStatus(500);
  }
});

app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('ID', sql.Int, movieId)
      .query('SELECT * FROM Movies WHERE ID = @ID');

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error('Error fetching movie details:', err);
    res.sendStatus(500);
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
app.delete("/Community/delete/:forumId", forumController.deleteForum);

// User Routes
app.post("/users/account/:id", validateUser.validateUserAccount, 
userController.createUser);
app.post("/users/account/login", userController.userLogin);
app.get("/users/login/:id", userController.getUserById);
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

// Admin Routes
app.post("/admins/login", adminController.adminLogin);
app.post("/admins/create", validateAdmin, adminController.createAdmin);
app.put("/admins/:email", validateAdmin, adminController.updateAdmin);
app.delete("/admins/:email", validateAdmin, adminController.deleteAdmin);
app.get("/admins/:email", adminController.getAdminsByEmail);
app.get("/admins", adminController.getAllAdmins);

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0);
});

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