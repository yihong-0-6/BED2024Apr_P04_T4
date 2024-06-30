const sql = require('mssql');
const dbConfig = require('../dbConfig')

class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  // Zhen Kang
  static async addUser(userData) {
    let connection;
    try {
      connection = await sql.connect(dbConfig);

      const sqlQuery = `INSERT INTO Users (username, password, email) 
      VALUES (@username, @password, @email)`;

      const request = connection.request();
      request.input('username', sql.VarChar, userData.username);
      request.input('password', sql.VarChar, userData.password);
      request.input('email', sql.VarChar, userData.email);

      await request.query(sqlQuery);
    } 
    
    catch (error) {
      console.error('Error adding user:', error);
      throw error;
    } 
    
    finally {
      if (connection) {
        connection.close();
      }
    }
  }

  // Zhen Kang
  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT username, password, email FROM Users`;

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close(); 

    return result.recordset.map(
      (row) => new User(row.id, row.username, row.email)
    ); // Convert rows to User objects
  }

  // Zhen Kang
  static async updateUsername(oldUsername, newUserData) {
    let connection;
    
    try {
      connection = await sql.connect(dbConfig);
      const sqlQuery = `
        UPDATE Users
        SET username = @newUsername
        WHERE username = @oldUsername
      `;

      const request = connection.request();
      request.input('oldUsername', sql.VarChar, oldUsername);
      request.input('newUsername', sql.VarChar, newUserData.username);

      const result = await request.query(sqlQuery);

      return result.rowsAffected[0] > 0; // Check if rows were affected
    } 
    
    catch (error) {
      console.error("Error updating username:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        connection.close();
      }
    }
  }


  //Yi Hong S10257222
  static async createUser(newUserData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `INSERT INTO Users (username, password, email) 
    VALUES (@username, @password, @email); 
    SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record

    const request = connection.request();
    request.input("username", newUserData.username);
    request.input("password", newUserData.password);
    request.input("email", newUserData.email)

    const result = await request.query(sqlQuery);

    connection.close();

    return this.getAllUsers();
  }
}


module.exports = User;