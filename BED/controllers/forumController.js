

const Forum = require("../models/forum");

// Create new forum
const createForum = async (req, res) => {
  const { title, author, message } = req.body;


  // Validate input

  if (!title || !author || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {

    // Create forum post and get the new forum's ID
    const result = await Forum.createForum(title, author, message);

    // Check if result contains the forum ID
    if (result && result.recordset && result.recordset.length > 0) {
      const newForum = result.recordset[0]; // Access the new record
      const forumId = newForum.forumId; // Access the ID property correctly

      // Log and respond with success
      const logForum = {
        success: "New Forum Created Successfully!",
        forumId: forumId, // Use forumId obtained from newForum
        title: title,
        author: author,
        message: message
      };

      // Convert the object to a JSON string and pretty-print it
      console.log(JSON.stringify(logForum, null, 2)); 

      res.status(201).json({ success: true, data: logForum });
    } 
    
    else {
      // Handle the case where the result does not contain the expected data
      res.status(500).json({ success: false, message: 'Failed to retrieve created forum ID' });

    // Check for existing forums with the same title and author
    const existingForums = await Forum.find({ title: title, author: author });

    if (existingForums.length > 0) {
      return res.status(400).json({ success: false, message: 'A forum with the same title and author already exists.' });
    }
  
    // Create the forum post
    const result = await Forum.createForum({ title, author, message });

    const logForum = {
      success: "New Forum Created Successfully!",
      title: title,
      author: author,
      message: message
    };

    console.log(JSON.stringify(logForum, null, 2)); 
    
    res.status(201).json({ success: true, data: result });

  } 
  catch (err) {
    // Handle and log errors
    console.error('Error creating forum:', err);
    res.status(500).json({ success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : 'Error creating forum' });
  }
};



const getForumById = async (req, res) => {
  const forumId = parseInt(req.params.forumId);
  try {
    const forum = await Forum.getForumById(forumId);
    if (!forum) {
      return res.status(404).send("Forum not found");
    }
    res.json(forum);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving forum");
  }
};

// Get all forums
const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.getAllForums();
    res.json(forums);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving forums");
  }
};

// Remove a forum
const deleteForum = async (req, res) => {
  const forumId = parseInt(req.params.forumId);

  try {
    const success = await Forum.deleteForum(forumId);

    if (!success) {
      return res.status(404).send("Forum not found");
    }
    res.status(204).send();
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send("Error deleting forum");
  }
};

module.exports = {
  createForum,
  getForumById,
  getAllForums,
  deleteForum
};