const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body parser
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const forumController = require('./controllers/forumController');
const loginController = require("./controllers/loginController");

const validateUser = require("./middlewares/validateUser");
const authUser = require("./middlewares/authUser");

// EdisonChewJiaJun S10244576H (Articles)
const articleController = require("./controllers/articleController");
const validateArticle = require('./middlewares/validateArticle');

const movieController = require('./controllers/movieController');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Users Routes & Forums From Community Page - Zhen Kang
app.get("/Community", forumController.getAllForums); 
app.delete("/Community/delete/:forumId", forumController.deleteForum);

app.post("user/account/login", loginController.userLogin);
app.get("/login/:id", loginController.getUserById);
app.put("/user/account/:id", loginController.updateUser);
app.delete("user/account/:id", loginController.deleteUser);

//Yi Hong S10257222
app.post("/addUser", validateUser, loginController.createUser);


// EdisonChewJiaJun S10244576H Routes for GET request for articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:ID", articleController.getArticleById);
app.put("/articles/:ID", validateArticle, articleController.updateArticle); // Updating the articles
app.delete("/articles/:ID", articleController.deleteArticle);

// Tam Shi Ying S10257952D Routes for GET request for movies
app.get("/movies", movieController.getAllMovies);
app.get("/movies/:ID", movieController.getMovieById);


app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
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