const Articles = require("../models/article");

// Defines a controller object with functions for handling GET request related to articles
const getAllArticles = async (req, res) => {
    // This method utilizes the 'Articles.getAllArticles' method to retrieve all articles
    try {
        const articles = await Articles.getAllArticles();
        res.json(articles)

        // It catches potential errors
    } catch (error) {
        console.error(error);
        // Sends an error message to the client
        res.status(500).send("Error retrieving articles");
    }
};

const getArticleById = async (req, res) => {
    // It parses the 'ID' from the request parameters
    const articleId = parseInt(req.params.ID);
    // This function retrieves a book by ID using the 'Articles.getArticleById' method.
    try {
        const article = await Articles.getArticleById(articleId);
        // If unsuccessful, an error message with a 404 status code
        if (!article) {
            return res.status(404).send("Article not found");
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving article");
    }
};

const updateArticle = async (req, res) => {
    const articleId = parseInt(req.params.ID);
    const newArticleData = req.body;
  
    try {
        const updatedArticle = await Articles.updateArticle (articleId, newArticleData);
        if (!updatedArticle) {
            return res.status(404).send("Article not found");
        }
        res.json(updatedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating article");
    }
};

const deleteArticle = async (req, res) => {
    const articleId = parseInt(req.params.ID);
  
    try {
        const success = await Article.deleteArticle(articleId);
        if (!success) {
            return res.status(404).send("Article not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting article");
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};