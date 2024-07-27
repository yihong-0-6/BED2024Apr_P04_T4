// Yi Hong S10257222
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// Middleware to validate user account details
const validateUserAccount = (req, res, next) => {
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

// Middleware to verify JWT and check user role
function verifyJWTuser(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer [token]" format

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    // Check if the user has the "user" role
    if (!decoded.userrole || decoded.userrole !== 'user') {
      return res.status(403).json({ message: 'Access denied. Users only.' });
    }

    // Attach the decoded token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = { validateUserAccount, verifyJWTuser };
