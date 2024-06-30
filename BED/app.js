const express = require("express");
const loginController = require("./controllers/loginController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const validateUser = require("./middlewares/validateUser");
const articleController = require("./controllers/articleController")
const validateArticle = require('./middlewares/validateArticle')

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling


app.get("/user", loginController.getAllUsers);
app.put("/user", validateUser, loginController.updateUsername);
app.post("/user", validateUser, loginController.createUser);

// Routes for GET request for articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:ID", articleController.getArticleById);
app.put("/articles/:ID", validateArticle, articleController.updateArticle);
app.delete("/articles/:ID", articleController.deleteArticle);


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