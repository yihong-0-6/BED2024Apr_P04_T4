const Forum = require("../models/forum");

// Create new forum
const createForum = async (req, res) => {
  const { title, author, comments } = req.body;
  try {
    const result = await Forum.createForum(title, author, comments);

    console.log('New forum created successfully:', result);

    res.redirect('/Community');
  } 

  catch (err) {
    console.error('Error creating forum:', err);
    res.status(500).send('Error creating forum');
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
    const success = await Forum.deletePost(forumId);

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