const sql = require('mssql');
const dbConfig = require('../dbconfig');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static async getAllUsers() {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Users`; // Replace with your actual table name

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
}


module.exports = User;