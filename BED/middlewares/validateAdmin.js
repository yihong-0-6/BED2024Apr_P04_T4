//Yi Hong S10257222
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required()
  });

  const validation = schema.validate(req.body, { abortEarly: false }); // Validate request body

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return; // Terminate middleware execution on validation error
  }

  next(); // If validation passes, proceed to the next route handler
};


function verifyJWTadmin(req, res, next) {
  // Get the token from the request body
  const token = req.body.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  // Verify and decode the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    // Check if the admin has the "Admin" role
    if (!decoded.userrole || decoded.userrole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Attach the decoded token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
}



module.exports = validateAdmin;
module.exports = {verifyJWTadmin};