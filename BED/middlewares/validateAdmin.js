const Joi = require("joi");
const jwt = require("jsonwebtoken");

const validateAdmin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(4).max(50).required()
  });

  const validation = schema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    res.status(400).json({ message: "Validation error", errors });
    return;
  }

  next();
};

const verifyJWTadmin = (req, res, next) => {
  const token = req.body.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    if (!decoded.userrole || decoded.userrole !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  validateAdmin,
  verifyJWTadmin
};
