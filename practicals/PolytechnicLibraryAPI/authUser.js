const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate user input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    const user = await User.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const passwordMatch = await 
    bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ 
        message: 'Invalid credentials' });
    }

    // Ensure JWT secret key is defined
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log("JWT Secret Key:", jwtSecretKey);  // Debugging

    if (!jwtSecretKey) {
      console.error("JWT secret key is not defined");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id, 
        username: user.username, role: user.role },
      
        jwtSecretKey,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return token to client
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;