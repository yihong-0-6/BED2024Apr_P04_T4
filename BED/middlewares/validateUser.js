//Yi Hong S10257222
const Joi = require("joi");

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; // Terminate middleware execution on validation error
  }

  next(); // If validation passes, proceed to the next route handler
};

module.exports = validateUser;