//Yi Hong S10257222H
const Joi = require("joi");

//Validation to ensure data entered meets the requirements
const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(50).required(), 
    password: Joi.string().min(4).max(150).required()
  });

  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return;
  }

  next();
};



module.exports = {
  validateAdmin
};
