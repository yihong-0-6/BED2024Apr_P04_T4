const User = require("../models/user");

// Zhen Kang
const getAllUsers = async (req, res) => {
  const userData = req.body; // Ensure you get data from the request body

  try {
    const users = await User.getAllUsers(userData.username, userData.password, userData.email);
    res.json(users);
  } 
  
  catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send("Error retrieving users");
  }
};

// Zhen Kang
const updateUsername = async (req, res) => {
  const oldUsername = req.body.oldUsername;
  const newUsername = req.body.newUsername;

  if (!oldUsername || !newUsername) {
    return res.status(400).json({ message: 'Old username and new username are required' });
  }

  try {
    const result = await User.updateUsername(oldUsername, { username: newUsername });

    if (result) {
      res.status(200).send("Username updated successfully");
    } else {
      res.status(404).send("Username not found");
    }
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).send("Error updating username");
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



module.exports = {
  getAllUsers,
  updateUsername,
  createUser
}