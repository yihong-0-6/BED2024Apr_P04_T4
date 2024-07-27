const Joi = require("joi");

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

  next(); // Proceed to next route handler once validation passes
};


module.exports = {
  forumValidation,
};
