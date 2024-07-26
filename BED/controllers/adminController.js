//Yi Hong
const Admins = require("../models/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Fetch admin from the database
    const admin = await Admins.adminLogin(email);

    if (admin) {
        // Compare the hashed password
        const isMatch = await bcryptjs.compare(password, admin.password);

        if (isMatch) {
            // Define the payload
            const payload = {
                email: admin.email,
            };

            // Generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECERT, { expiresIn: "3600s" });

            res.status(200).json({
                message: "Login successful",
                token: token,
                email: admin.email
            });
        } 
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }


    } 
    else {
        res.status(401).json({ message: "Invalid email or password" });
    }
  } 
    
    catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
  };
  
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