const sql = require('mssql');
const dbConfig = require('.dbConfig');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
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

  static async createUser(newUserData) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record

    const request = connection.request();
    request.input("title", newBookData.title);
    request.input("author", newBookData.author);

    const result = await request.query(sqlQuery);

    connection.close();

    // Retrieve the newly created book using its ID
    return this.getBookById(result.recordset[0].id);
  }
}


module.exports = User;