
const sql = require('mssql');
const dbConfig = require("../dbConfig");

class Forum {
  constructor(forumId, title, author, likes, dislikes, comments) {
    this.forumId = forumId,
    this.title = title;
    this.author = author,
    this.likes = likes;
    this.dislikes = dislikes;
    this.comments = comments;
  }

  static async createForum(title, author, comments) {
    try {
      await sql.connect(dbConfig);
  
      const request = new sql.Request();
  
      // Assuming `id` is an identity column that auto-generates
      const query = `
        INSERT INTO Forums (title, author, comments) 
        OUTPUT Inserted.forumId AS forumId
        VALUES (@title, @author, @comments)
      `;
  
      request.input('title', sql.VarChar, title);
      request.input('author', sql.VarChar, author);
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
          result.recordset[0].likes,
          result.recordset[0].dislikes,
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
        (row) => new Forum(row.forumId, row.title, row.author, row.likes, 
          row.dislikes, row.comments)
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

  static async getForumById(forumId){
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Forums WHERE forumId = @forumId`; 

    const request = connection.request();

    request.input("forumId", forumId);

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

  static async deleteForum(forumId) {
        const connection = await sql.connect(dbConfig);

        // Define the SQL query with parameter
        const sqlQuery = 'DELETE FROM Forums WHERE forumId = @forumId';

        // Create a new request
        const request = new sql.Request(connection);

        // Add the parameter to the request
        request.input('forumId', forumId); // Ensure the data type matches the database schema

        // Execute the query
        const result = await request.query(sqlQuery);

        connection.close();

        // Check if any rows were affected
        return result.rowsAffected[0] > 0; // Return true if rows were affected, indicating success
    } 
} 




module.exports = Forum;