const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY; 

function verifyJWT(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    
    const authorizedRoles = {
      "^/books$": ["member", "librarian"], 
      "^/books/[0-9]+/availability$": ["librarian"], 
    };

    const requestedEndpoint = req.path; 
    const userRole = decoded.role;

    
    const authorizedRole = Object.entries(authorizedRoles).find(
      ([endpoint, roles]) => {
        const regex = new RegExp(endpoint);
        return regex.test(requestedEndpoint) && roles.includes(userRole);
      }
    );

    if (!authorizedRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded; 
    next();
  });
}

module.exports = verifyJWT;
