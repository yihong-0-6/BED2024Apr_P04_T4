const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Forum {
  constructor(forumId, title, author, comments) {
    this.forumId = forumId,
    this.title = title;
    this.author = author,
    this.comments = comments;
  }

  static async createForum(title, author, comments) {
    try {

      await sql.connect(dbConfig);

      const request = new sql.Request();

      const query = `INSERT INTO Forums (title, author, comments) 
      VALUES (@title, @author, @comments)`;

      request.input('title', sql.VarChar, title);

      request.input('author', author);

      request.input('comments', sql.NVarChar, comments);

      const result = await request.query(query);

      return result;
    } 
    
    catch (err) {
      throw new Error(`Error creating forum: ${err.message}`);
    } 
    
    finally {
      sql.close();
    }
  }

  static async getForumById(forumId){
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Forums WHERE forumId = @forumId`; 

    const request = connection.request();
    request.input("id", forumId);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new Forum(
          result.recordset[0].forumId,
          result.recordset[0].title,
          result.recordset[0].author,
          result.recordset[0].comments
        )
      : null;
  }

  static async getAllForums() {
    let connection;
    
    try {
      connection = await sql.connect(dbConfig);

      const sqlQuery = `SELECT * FROM Forums`; 

      const request = connection.request();

      const result = await request.query(sqlQuery);

      return result.recordset.map(
        (row) => new Forum(row.forumId, row.title, row.author, row.comments)
      ); // Convert rows to Forum objects
    } 

    catch (error) {
      console.error("Error fetching forums:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        connection.close();
      }
    }
  }

  static async deleteForum(forumId) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE * FROM FORUM WHERE forumId = @forumId;`
                      
    const request = connection.request();

    request.input("id", forumId);

    const result = await request.query(sqlQuery);

    connection.close();

    return result.rowsAffected > 0; // Indicate success based on affected rows
  }
}

module.exports = Forum;
