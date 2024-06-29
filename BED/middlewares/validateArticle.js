const Joi = require("joi");

const validateArticle = (req, res, next) => {
    const schema = Joi.object({
        ID: Joi.string().min(1).max(100).required(),
        Title: Joi.string().min(3).max(100).required(),
        Author: Joi.string().min(3).max(100).required(),
    });

    const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body
    
    if (validation.error) {
        const errors = validation.error.details.map((error) => error.message);
        res.status(400).json({ message: "Validation error", errors });
        return; // Terminate middleware execution on validation error
    }

    next(); // If validation passes, proceed to the next route handler
};

module.exports = validateArticle