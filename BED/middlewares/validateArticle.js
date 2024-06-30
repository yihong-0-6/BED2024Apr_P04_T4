// EdisonChewJiaJun S10244576H
const Joi = require("joi");

const validateArticle = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(3).max(100).required(),
        Author: Joi.string().min(3).max(100).required(),
    });

    // The `schema.validate` method performs the validation against the request body (`req.body`).
    // The `abortEarly: false` option ensures that all validation errors are collected before sending a response.
    const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body
    
    if (validation.error) {
        // The errors are extracted and formatted into an array of messages.
        const errors = validation.error.details.map((error) => error.message);
        // A response with status code 400 (Bad Request) is sent, containing a message and the list of validation errors.
        res.status(400).json({ message: "Validation error", errors });
        return; // Terminate middleware execution on validation error
    }

    next(); // If validation passes, proceed to the next route handler
};

module.exports = validateArticle