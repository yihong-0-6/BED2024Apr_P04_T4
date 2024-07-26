const express = require("express");
const sql = require("mssql");
const path = require("path");
const fs = require('fs');
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser"); // Import body parser
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const multer = require("multer");
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
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});


app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
    
    // Server is ready
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with code 1 indicating an error
  }
});
// Users Routes & Forums From Community Page - Zhen Kang

// Creating New Forum
app.post('/Community/create', validateForum.forumValidation, forumController.createForum);

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

app.put("/articles/:ID", async (req, res) => {
  const articleId = req.params.ID;
  const { Title, Author } = req.body;

  if (!Title || !Author) {
      return res.status(400).send("Bad Request: Missing required fields");
  }

  try {
      const updatedArticle = await Article.updatedArticle(articleId, {
          Title,
          Author,
      }, { new: true });

      if (updatedArticle) {
          res.json({ message: "Article updated successfully", article: updatedArticle });
      } else {
          res.status(404).send("Article not found");
      }
  } catch (error) {
      console.error("Error updating article:", error);
      res.status(500).send("Internal Server Error");
  }
});

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

      console.log('Executing query:', query); // Log the query
      console.log('With parameters:', updates); // Log the parameters

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



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/Images/moviesimage');
  },
  filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const newName = `moviesimage${req.body.movieID}${ext}`;
      cb(null, newName);
  }
});
const upload = multer({ storage: storage });

// Add movie endpoint
app.post('/movies/add', upload.single('image'), async (req, res) => {
  const { movieID, name, publishedYear, director, country, description, trailerUrl } = req.body;

  const movieData = {
      ID: movieID,
      Name: name,
      Published_Year: publishedYear,
      Director: director,
      Country: country,
      Description: description,
      TrailerUrl: trailerUrl,
      ImageUrl: `/Images/moviesimage/moviesimage${movieID}${path.extname(req.file.originalname)}`
  };

  const query = `
      INSERT INTO Movies (ID, Name, Published_Year, Director, Country, Description, TrailerUrl, ImageUrl)
      VALUES (@ID, @Name, @Published_Year, @Director, @Country, @Description, @TrailerUrl, @ImageUrl)
  `;

  try {
      const pool = await sql.connect(dbConfig);
      const request = pool.request();
      Object.keys(movieData).forEach(key => {
          request.input(key, movieData[key]);
      });

      console.log('Executing query:', query); // Log the query
      console.log('With parameters:', movieData); // Log the parameters

      await request.query(query);
      res.status(200).send('Movie added successfully');
  } catch (error) {
      console.error('Error adding movie:', error);
      res.status(500).send('Error adding movie: ' + error.message);
  }
});


//Huang Yi Hong S10257222H Routes for GET request for admins
app.get("/admins/:email", adminController.getAdminsByEmail);
app.get("/admins", adminController.getAllAdmins);
app.post("/admins/create", adminController.createAdmin);
app.put("/admins/:email", validateAdmin, adminController.updateAdmin);
app.delete("/admins/:email", validateAdmin, adminController.deleteAdmin);





// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});