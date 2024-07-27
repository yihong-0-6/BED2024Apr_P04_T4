const sql = require('mssql');
const dbConfig = require('../../dbconfig')

class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static async userLogin(username, password) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users WHERE username = @username`; // Replace with your actual table name
    const request = connection.request();

    request.input('username', sql.VarChar, username);
    request.input('password', sql.VarChar, password);

    const result = await request.query(sqlQuery);

    connection.close();

    if (result.recordset.length > 0) {
      return result.recordset[0];
    } 
    else {
      return null;
    }
  }

  static async getUserById(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new User(
          result.recordset[0].id,
          result.recordset[0].username,
          result.recordset[0].password,
          result.recordset[0].email
        )
      : null;
  }

  static async getUserByUsername(username) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users WHERE username = @username`; // Parameterized query

    const request = connection.request();
    request.input("username", sql.VarChar, username);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new User(
          result.recordset[0].id,
          result.recordset[0].username,
          result.recordset[0].password,
          result.recordset[0].email
        )
      : null;
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
      (row) => new User(row.username, row.password, row.email)
    ); // Convert rows to User objects
  }

  // Zhen Kang
  static async updateUser(id, newUserData) {
    const createdUser = await this.getUserById(id);
    const connection = await sql.connect(dbConfig);
    
    const sqlQuery = `UPDATE Users SET username = @username, email = @email, 
                            password = @password WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id",id || createdUser.id);
    request.input("username", newUserData.username || createdUser.username);
    request.input("email", newUserData.email || createdUser.email);
    request.input("password", newUserData.password || createdUser.password);

    await request.query(sqlQuery);
    
    connection.close();

    return this.getUserById(id);
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

    await request.query(sqlQuery);

    connection.close();

    return this.getAllUsers();
  }

  static async deleteUser(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE FROM Users WHERE id = @id`; // Parameterized query

    const request = connection.request();
    request.input("id", id);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.rowsAffected > 0; 
  }
}


module.exports = User;