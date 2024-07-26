//Yi Hong
const Admins = require("../models/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Retrieve user from database by username
    const admin = await Admins.getAdminsByEmail(email);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare password
    const passwordMatch = await bcryptjs.compare(password, admin.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Ensure JWT secret key is defined
    if (!process.env.JWT_SECRET_KEY) {
      console.error("JWT secret key is not defined");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Generate JWT token
    const payload = {
      email: admin.email
    };

    // Sign token with secret and set expiry
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,
      { expiresIn: "3600s" }); // Expires in 1 hour
      
    // Return token to client
    res.status(200).json({ token });
  } 
  
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
  
  const getAdminsByEmail = async (req, res) => {
    const email = req.params.email;
  
    try {
        const admin = await Admins.getAdminsByEmail(email);
        if (!admin) {
          return res.status(404).send("Admin not found");
        }
        res.json(admin);
      } 
      
      catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving admin");
      }
  }

  const getAllAdmins = async (req, res) => {
    try {
      const admin = await Admins.getAllAdmins();
      res.json(admin);
    } 
    catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving admins");
    }
  };
  
  const updateAdmin = async (req, res) => {
    const email = req.params.email;
    const newAdminsData = req.body;
  
    try {
        if (newAdminsData.password) {
            // Hash the new password
            const salt = await bcryptjs.genSalt(10);
            newAdminsData.password = await bcryptjs.hash(newAdminsData.password, salt);
        }
  
        const updatedAdmin = await Admins.updateAdmin(email, newAdminsData);
  
        if (!updatedAdmin) {
            return res.status(404).send("Admin not found");
        }
        res.json(updatedAdmin);
    } 
    
    catch (error) {
        console.error("Update Admin Error: ", error);
        res.status(500).send("Error updating Admin");
    }
  };
  
  
  const createAdmin = async (req, res) => {
    const newAdminsData = req.body;
    try {
      const createdAdmin = await Admins.createAdmin(newAdminsData);
      res.status(201).json(createdAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error signing up");
    }
  };
  
  const deleteAdmin = async (req, res) => {
    const email = req.params.email;
  
    try {
      const success = await Admins.deleteAdmin(email);
      if (!success) {
        return res.status(404).send("Admin not found");
      }
      res.status(204).send();
    } 
    catch (error) {
      console.error(error);
      res.status(500).send("Error deleting Admin");
    }
  };
  
  
  
  module.exports = {
    adminLogin,
    getAdminsByEmail,
    getAllAdmins,
    updateAdmin,
    createAdmin,
    deleteAdmin
  }