const sql = require('mssql');
const dbConfig = require('../dbConfig')

class User {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users`;

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close(); 

    return result.recordset.map(
      (row) => new User(row.id, row.username, row.email)
    ); // Convert rows to User objects
  }

  static async updateUsername(username, newUserData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
      UPDATE Users
      SET username = @username
    `;

    const request = connection.request();
    request.input('oldUsername', sql.VarChar, username);
    request.input('newUsername', sql.VarChar, req.body.newUserName);
    request.query('UPDATE Users SET Username = @newUsername WHERE Username = @oldUsername');

    await request.query(sqlQuery);

    connection.close();

    return this.getAllUsers(username);
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