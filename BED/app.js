const express = require("express");
const loginController = require("./controllers/loginController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body parser
const validateUser = require("./middlewares/validateUser");
const articleController = require("./controllers/articleController")
const validateArticle = require('./middlewares/validateArticle')

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling


app.get("/user", loginController.getAllUsers);

//Zhen Kang
app.put("/user", validateUser, loginController.updateUsername);

//Yi Hong S10257222
app.post("/user", validateUser, loginController.createUser);


// EdisonChewJiaJun S10244576H Routes for GET request for articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:ID", articleController.getArticleById);
app.put("/articles/:ID", validateArticle, articleController.updateArticle);
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