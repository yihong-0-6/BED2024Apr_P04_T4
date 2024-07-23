const sql = require('mssql');
const dbConfig = require('../dbConfig');

class User {
  constructor(user_id, username, passwordHash, role) {
    this.user_id = user_id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  static async getUserByUsername(username) {
    let connection;
    
    try {
      connection = await sql.connect(dbConfig);
      
      const sqlQuery = `SELECT * FROM Users WHERE username = @username`;
      const request = connection.request();
      
      request.input('username', sql.VarChar, username);
      const result = await request.query(sqlQuery);
      
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        return new User(user.user_id, user.username, user.passwordHash, user.role);
      } 
      
      else {
        return null; // User not found
      }
    } 
    
    catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  static async registerUser(username, passwordHash, role) {
    let connection;

    try {
      connection = await sql.connect(dbConfig);
      
      const sqlQuery = `
        INSERT INTO Users (username, passwordHash, role)
        OUTPUT INSERTED.user_id
        VALUES (@username, @passwordHash, @role)
      `;
      const request = connection.request();
      
      request.input('username', sql.VarChar, username);
      request.input('passwordHash', sql.VarChar, passwordHash);
      request.input('role', sql.VarChar, role);
      
      const result = await request.query(sqlQuery);
      const user_id = result.recordset[0].user_id;

      return new User(user_id, username, passwordHash, role); // Return the new user object with ID
    } 
    
    catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

module.exports = User;
