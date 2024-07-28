// Importing the 'Articles' model which contains methods to interact with the articles data
const Articles = require("../models/article");

// Controller function to handle the retrieval of all articles
const getAllArticles = async (req, res) => {
    // This function uses the 'Articles.getAllArticles' method to fetch all articles from the database
    try {
        const articles = await Articles.getAllArticles(); // Await the promise returned by the method
        res.json(articles); // Sends the retrieved articles as a JSON response to the client

    } catch (error) {
        // Handles any potential errors during the process
        console.error("Error fetching articles: ", error); // Logs the error to the console
        res.status(500).send("Error retrieving articles"); // Sends an error message to the client with a 500 status code
    }
};

// Controller function to handle the retrieval of a single article by ID
const getArticleById = async (req, res) => {
    // Parses the 'ID' from the request parameters and converts it to an integer
    const articleId = parseInt(req.params.ID);

    // This function retrieves an article by its ID using the 'Articles.getArticleById' method
    try {
        const article = await Articles.getArticleById(articleId); // Await the promise returned by the method
        
        // If the article is not found, send a 404 status code with an error message
        if (!article) {
            return res.status(404).send("Article not found");
        }

        // If the article is found, send it as a JSON response to the client
        res.json(article);

    } catch (error) {
        // Handles any potential errors during the process
        console.error("Error fetching article: ", error); // Logs the error to the console
        res.status(500).send("Error retrieving article"); // Sends an error message to the client with a 500 status code
    }
};

// Controller function to handle the update of an article
const updateArticle = async (req, res) => {
    // Parses the 'ID' from the request parameters and converts it to an integer
    const articleId = parseInt(req.params.ID);

    // Retrieves the updated data from the request body
    const updatedData = req.body;

    // This function updates an article by its ID using the 'Articles.updateArticle' method
    try {
        const updatedArticle = await Articles.updateArticle(articleId, updatedData); // Await the promise returned by the method
        
        // If the article is not found, send a 404 status code with an error message
        if (!updatedArticle) {
            return res.status(404).send("Article not found");
        }
        
        // If the update is successful, send back the updated article as a JSON response
        res.status(200).json(updatedArticle);

    } catch (err) {
        // Handles any potential errors during the process
        console.error('Error updating article:', err); // Logs the error to the console
        res.status(500).send("Error updating article"); // Sends an error message to the client with a 500 status code
    }
};

// Controller function to handle the deletion of an article
const deleteArticle = async (req, res) => {
    // Parses the 'ID' from the request parameters and converts it to an integer
    const articleId = parseInt(req.params.ID);
  
    // This function deletes an article by its ID using the 'Articles.deleteArticle' method
    try {
        const success = await Articles.deleteArticle(articleId); // Await the promise returned by the method

        // If the article is not found, send a 404 status code with an error message
        if (!success) {
            return res.status(404).send("Article not found");
        }

        // If the deletion is successful, send a 204 status code indicating no content
        res.status(204).send();

    } catch (error) {
        // Handles any potential errors during the process
        console.error(error); // Logs the error to the console
        res.status(500).send("Error deleting article"); // Sends an error message to the client with a 500 status code
    }
};

// Exporting the controller functions for use in other parts of the application
module.exports = {
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};
