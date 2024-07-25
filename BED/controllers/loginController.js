const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Zhen Kang
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Fetch user from the database
      const user = await User.userLogin(username);

      if (user) {
          // Compare the hashed password
          const isMatch = await bcryptjs.compare(password, user.password);

          if (isMatch) {
              // Define the payload
              const payload = {
                  userId: user.userId,
                  username: user.username,
              };

              // Generate JWT token
              const token = jwt.sign(payload, process.env.JWT_SECERT, { expiresIn: "3600s" });

              res.status(200).json({
                  message: "Login successful",
                  token: token,
                  userId: user.userId
              });
          } 
          else {
              res.status(401).json({ message: "Invalid username or password" });
          }


      } 
      else {
          res.status(401).json({ message: "Invalid username or password" });
      }
  } 
  
  catch (error) {
      console.error("Login Error: ", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Zhen Kang
const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
      const user = await User.getUserById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } 
    
    catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving User");
    }
}

// Zhen Kang
const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const newUserData = req.body;

  try {
      if (newUserData.password) {
          // Hash the new password
          const salt = await bcryptjs.genSalt(10);
          newUserData.password = await bcryptjs.hash(newUserData.password, salt);
      }

      const updatedUser = await User.updateUser(userId, newUserData);

      if (!updatedUser) {
          return res.status(404).send("User not found");
      }
      res.json(updatedUser);
  } 
  
  catch (error) {
      console.error("Update User Error: ", error);
      res.status(500).send("Error updating User");
  }
};


//Yi Hong S10257222
const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const createdUser = await User.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signing up");
  }
};

// Zhen Kang
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const success = await User.deleteUser(userId);
    if (!success) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error deleting User");
  }
};



module.exports = {
  userLogin,
  getUserById,
  updateUser,
  createUser,
  deleteUser
}