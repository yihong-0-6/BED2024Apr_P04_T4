const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async(req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.getAllUsers(id);

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
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // Validate user input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // Fetch user from the database
    const user = await User.userLogin(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Define the payload
    const payload = {
      id: user.id,
      username: user.username,
    };

    // Generate JWT token
    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: "3600s" });

    res.status(200).json({
      message: "Login successful",
      token: token,
      id: user.id
    });
  } 
  
  catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Zhen Kang
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
      const user = await User.getUserById(id);
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
  const id = parseInt(req.params.id);
  const newUserData = req.body;

  try {
      if (newUserData.password) {
          // Hash the new password
          const salt = await bcryptjs.genSalt(10);
          newUserData.password = await bcryptjs.hash(newUserData.password, salt);
      }

      const updatedUser = await User.updateUser(id, newUserData);

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
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newuser = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    // Ensure createUser returns the created user object
    const createdUser = await User.createUser(newuser);

    if (!createdUser) {
      return res.status(500).json({ message: "User creation failed" });
    }

    res.status(201).json(createdUser);
  } 
  
  catch (error) {
    console.error("Error creating User: ", error);
    res.status(500).send("Error creating User");
  }
};



// Zhen Kang
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const success = await User.deleteUser(id);
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

const forgotPassword = async (req, res) => {
  const email = req.params.email; 

  try {
    const user = await User.forgotPassword(email);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving User");
  }
}

const confirmPassword = async (req, res) => {
  const { id, currentPassword } = req.body;

  try {
      // Fetch user from the database
      const user = await User.getUserById(id);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Compare the hashed password
      const isMatch = await bcryptjs.compare(currentPassword, user.password);

      if (isMatch) {
          res.status(200).json({ message: "Password is correct!" });
      } 
      
      else {
          res.status(401).json({ message: "Invalid password" });
      }
  } 
  
  catch (error) {
      console.error("Password Check Error: ", error);
      res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  getAllUsers,
  userLogin,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
  forgotPassword, 
  confirmPassword
}