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

// Middlewares
const validateForum = require("./middlewares/validateForum");
const validateUser = require("./middlewares/validateUser");
const validateArticle = require('./middlewares/validateArticle');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.use(cors()); // Enable CORS
// Include body-parser middleware to handle JSON data
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Serve static files from the 'public' directory at the root level
app.use(express.static(path.join(__dirname, '..', 'public')));

// Users Routes & Forums From Community Page - Zhen Kang

// Getting all forums
app.get('/Community', forumController.getAllForums);


app.get("/Community/forums", async (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "Community.html");
  console.log("File path is ", filePath);
  res.sendFile(filePath);
});

// Creating New Forum
app.post('/Community/create', (req, res, next) => {
  next();
}, validateForum.forumValidation, forumController.createForum);


// Get forum by Id
app.get("/Community/:forumId", forumController.getForumById);

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
app.get("/movies", movieController.getAllMovies);
app.get("/movies/:ID", movieController.getMovieById);
app.get("/movies/firstsix", movieController.getFirstSixMovies);

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