const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Forum {
  constructor(title, likes, dislikes, comments) {
    this.title = title;
    this.likes = likes;
    this.dislikes = dislikes;
    this.comments = comments;
  }

  static async getAllForums() {
    let connection;
    
    try {
      connection = await sql.connect(dbConfig);

      const sqlQuery = `SELECT * FROM Forums`; 

      const request = connection.request();

      const result = await request.query(sqlQuery);

      return result.recordset.map(
        (row) => new Forum(row.title, row.likes, row.dislikes, row.comments)
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

  static async deleteForum(id) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `DELETE * FROM FORUM WHERE forumId = @id;`
                      
    const request = connection.request();

    request.input("id", id);

    const result = await request.query(sqlQuery);

    connection.close();

    return result.rowsAffected > 0; // Indicate success based on affected rows
  }
}

module.exports = Forum;
