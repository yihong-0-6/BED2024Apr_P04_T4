//Yi Hong S10257222
const Joi = require("joi");


const validateUserAccount = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body

  if (validation.error) {
    const errors = validation.error.details.map((error) => {
        // Customize error messages for display
        switch (error.context.key) {
            case 'username':
                return 'Username must be at least 4 characters long';
            case 'password':
                return 'Password must be at least 4 characters long';
            case 'email':
                return 'Invalid email format';    
            default:
                return error.message.replace(/["]/g, '');
        }
    });
    return res.status(400).json({ message: 'Validation error', errors });
  }

  next();
};



module.exports = {
  validateUserAccount
};
