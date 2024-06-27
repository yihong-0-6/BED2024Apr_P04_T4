const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);

    return users.recordset[0]
      ? new User(
          result.recordset[0].username,
          result.recordset[0].password
        )
      : null;  
      }

  catch (users) {
    console.error(users);
    res.status(500).send("Error retrieving users");
  }
};

const updateUsername = async (req, res) => {
  const userName = String(req.prams.userName);
  const newUserData = req.body;

  try {
    const updateUsername = await User.updateUser(userName, newUserData);

    if (updateUsername) {
      return res.status(200).send("Username updated successfully"); 
    }

    if (!updateUsername) {
      return res.status(404).send("Username not found");
    }
    res.json(updateUsername);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating username");
  }
};



module.exports = {
  getAllUsers,
  updateUsername,
}