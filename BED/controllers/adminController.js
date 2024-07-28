//Yi Hong S10257222
const Admins = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateAdmin } = require("../middlewares/validateAdmin");

//Method to handle admin log in
async function adminLogin(req, res) {
  const { email, password } = req.body;

  try {
    //Validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    //Retrieve user from database by username
    const admin = await Admins.getAdminsByEmail(email);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    //Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, admin.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    else{
      const loggedIn = await Admins.adminLogin(password);
      res.status(201).json(loggedIn);
    }

  }
  catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
  
//Method to retrieve admin details by email
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

  //Method to retrieve all admin details in database
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
  
  //Method to create a new admin in database
  const createAdmin = async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10) //Hashing the password using bcrypt and salt
      const newAdminsData = { email: req.body.email, password: hashedPassword} //Setting the variables
      const createdAdmin = await Admins.createAdmin(newAdminsData);
      res.status(201).json(createdAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error signing up");
    }
  };
  
  //Method to delete admin data from database
  const deleteAdmin = async (req, res) => {
    const email = req.params.email;
  
    try {
      const success = await Admins.deleteAdmin(email); //Ensure admin exists
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
    createAdmin,
    deleteAdmin
  }