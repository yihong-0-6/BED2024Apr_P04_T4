const express = require("express");
const bodyParser = require("body-parser");
const articleController = require("./controllers/articleController")
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const validateArticle = require('./middlewares/validateArticle')

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Routes for GET request for articles
app.get("/articles", articleController.getAllArticles);
app.get("/articles/:id", articleController.getArticleById);
app.put("/articles/:id", validateArticle, articleController.updateArticle);
app.delete("/articles/:id", articleController.deleteArticle);


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