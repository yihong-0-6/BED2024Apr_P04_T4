require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body-parser
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec

const app = express();
const staticMiddleware = express.static("public");

const booksController = require("./controllers/booksController");
const usersController = require("./controllers/usersController");

const port = 3030;

// Include body-parser middleware to handle JSON data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

app.use(staticMiddleware); // Mount the static middleware

// Get All Books
app.get('/books', booksController.getAllBooks);

// Update Book Availability
app.put("/books/:id/availability", booksController.updateBookAvailability);

// Create User
app.post("/users", usersController.registerUser);

// Login User
app.post("/login", usersController.login);

// Start server and connect to the database
app.listen(port, async () => {
  try {
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } 
  catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Graceful shutdown on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});