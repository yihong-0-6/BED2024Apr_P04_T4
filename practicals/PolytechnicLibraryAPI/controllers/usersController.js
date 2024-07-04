const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Validate user input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Retrieve user from database by username
    const user = await User.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure JWT secret key is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT secret key is not defined");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Generate JWT token
    const payload = {
      userId: user.user_id,
      role: user.role 
    };

    // Sign token with secret and set expiry
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,
      { expiresIn: "3600s" }); 
      
    // Return token to client
    res.status(200).json({ token });
  } 
  
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function registerUser(req, res) {
  const { username, password, role } = req.body;

  try {
    // Validate user data
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing username
    const existingUser = await User.getUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in database
    const newUser = await 
    User.registerUser(username, hashedPassword, role);

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } 
  
  catch (err) {
    console.error("Registration error:", err.message); // Log the error message
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
  login
}
