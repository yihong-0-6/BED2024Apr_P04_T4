const express = require("express");
const sql = require("mssql");
const path = require("path");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body parser
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors"); 

// Controllers
const forumController = require('./controllers/forumController');
const loginController = require("./controllers/loginController");
const articleController = require("./controllers/articleController");
const movieController = require('./controllers/movieController');
const adminController = require('./controllers/adminController');

// Middlewares
const validateForum = require("./middlewares/validateForum");
const validateUser = require("./middlewares/validateUser");
const validateArticle = require('./middlewares/validateArticle');
const { validateAdmin, verifyJWTadmin } = require("./middlewares/validateAdmin");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.use(cors()); // Enable CORS
// Include body-parser middleware to handle JSON data
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Serve static files from the 'public' directory at the root level
app.use(express.static(path.join(__dirname, '..', 'public')));

// Users Routes & Forums From Community Page - Zhen Kang

// Creating New Forum
app.post('/Community/create', (req, res, next) => {
  next();
}, validateForum.forumValidation, forumController.createForum);

// Getting all forums
app.get('/Community', forumController.getAllForums);


app.get("/Community/forums", async (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "Community.html");
  console.log("File path is ", filePath);
  res.sendFile(filePath);
});


// Get forum by Id
app.get("/Community/id/:forumId", forumController.getForumById);

// Deleting a forum
app.delete("/Community/delete/:forumId", forumController.deleteForum);

app.post("/user/account/login", loginController.userLogin);

// Get user by Id
app.get("/login/:id", loginController.getUserById);

// Update user
app.put("/user/account/:id", loginController.updateUser);

// Remove user
app.delete("/user/account/:id", loginController.deleteUser);

app.get("/registerUser", (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "mainsignup.html");
  console.log("File path is ", filePath);
  res.sendFile(filePath);
});

app.get("/loginUser", (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "mainlogin.html");
  console.log("File path is ", filePath);
  res.sendFile(filePath);
});

// EdisonChewJiaJun S10244576H Routes for GET request for articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:ID", articleController.getArticleById);
app.put("/articles/:ID", validateArticle, articleController.updateArticle); // Updating the articles
app.delete("/articles/:ID", articleController.deleteArticle);

// Tam Shi Ying S10257952D Routes for GET request for movies
app.get("/movies/firstsix", movieController.getFirstSixMovies); // More specific route
app.get("/movies/:id", movieController.getMovieById); // More general route
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
  const { Name, Published_Year, Director, Country, Description, TrailerUrl } = req.body;

  try {
      const connection = await sql.connect(dbConfig);
      const query = `
          UPDATE Movies
          SET Name = @Name, Published_Year = @Published_Year, Director = @Director, Country = @Country, Description = @Description, TrailerUrl = @TrailerUrl
          WHERE ID = @ID
      `;
      const request = connection.request();
      request.input('ID', sql.Int, movieId);
      request.input('Name', sql.NVarChar, Name);
      request.input('Published_Year', sql.Int, Published_Year);
      request.input('Director', sql.NVarChar, Director);
      request.input('Country', sql.NVarChar, Country);
      request.input('Description', sql.NVarChar, Description);
      request.input('TrailerUrl', sql.NVarChar, TrailerUrl);
      await request.query(query);
      connection.close();
      res.status(200).send('Movie updated successfully');
  } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).send('Error updating movie');
  }
});

app.put('/countries/:id', async (req, res) => {
  const countryId = req.params.id;
  const { CountryName, Description } = req.body;

  try {
      const connection = await sql.connect(dbConfig);
      const query = `
          UPDATE Countries
          SET CountryName = @CountryName, Description = @Description
          WHERE ID = @ID
      `;
      const request = connection.request();
      request.input('ID', sql.Int, countryId);
      request.input('CountryName', sql.NVarChar, CountryName);
      request.input('Description', sql.NVarChar, Description);
      await request.query(query);
      connection.close();
      res.status(200).send('Country updated successfully');
  } catch (error) {
      console.error('Error updating country:', error);
      res.status(500).send('Error updating country');
  }
});

//Huang Yi Hong S10257222H Routes for GET request for admins
app.get("/admins/:email", adminController.getAdminsByEmail);
app.get("/admins", adminController.getAllAdmins);
app.post("/admins/create", adminController.createAdmin);
app.put("/admins/:email", validateAdmin, adminController.updateAdmin);
app.delete("/admins/:email", validateAdmin, adminController.deleteAdmin);



app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } 
  
  catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});