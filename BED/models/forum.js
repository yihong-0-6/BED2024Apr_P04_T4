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
}

module.exports = Forum;
