const Articles = require("../models/article");

const getAllArticles = async (req, res) => {
    try {
        const articles = await Articles.getAllArticles();
        res.json(articles)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving articles");
    }
};

const getArticleById = async (req, res) => {
    const articleId = parseInt(req.params.id);
    try {
        const article = await Articles.getArticleById(articleId);
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
    const articleId = parseInt(req.params.id);
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
    const articleId = parseInt(req.params.id);
  
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

module.export = {
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};