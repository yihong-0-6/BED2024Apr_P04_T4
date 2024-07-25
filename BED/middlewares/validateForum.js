const Joi = require("joi");

// In-memory storage for titles (for demonstration purposes)
let titles = new Set();

const forumValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(60).required(),
    author: Joi.string().max(40).required(),
    message: Joi.string().max(400).required(),
  });

  // Validate request body
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: "Validation error", errors });
  }

  // Check for duplicate title
  const { title} = req.body;

  if (titles.has(title)) {
    return res.status(400).json("Title already exists" );
  }

  // Add the title to the set (for future requests)
  titles.add(title);

  next(); // Proceed to the next route handler
};

module.exports = {
  forumValidation,
};

