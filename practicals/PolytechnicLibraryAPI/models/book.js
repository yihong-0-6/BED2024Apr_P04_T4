const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Book {
  constructor(book_id, title, author, availability) {
    this.book_id = book_id;
    this.title = title;
    this.author = author;
    this.availability = availability;
  }

  static async getAllBooks() {
    let connection;

    try {
      connection = await sql.connect(dbConfig);

      const sqlQuery = `SELECT * FROM Books`; 

      const request = connection.request();

      const result = await request.query(sqlQuery);

      return result.recordset.map(
        (row) => new Book(row.book_id, row.title, row.author, row.availability)
      ); // Convert rows to Book objects
    } 
    
    catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        connection.close();
      }
    }
  }

  static async updateAvailability(book_id, newAvailability) {
    let connection;
  
    try {
      connection = await sql.connect(dbConfig);
  
      const sqlQuery = `
        UPDATE Books
        SET availability = @availability
        WHERE book_id = @book_id
      `;
  
      const request = connection.request();
      request.input('book_id', sql.Int, book_id);
      request.input('availability', sql.Char, newAvailability);
  
      // Execute the update query
      const result = await request.query(sqlQuery);
  
      if (result.rowsAffected[0] > 0) {
        // Retrieve the updated book
        const selectQuery = `
          SELECT * FROM Books WHERE book_id = @book_id
        `;
        const selectRequest = connection.request();
        selectRequest.input('book_id', sql.Int, book_id);
  
        const selectResult = await selectRequest.query(selectQuery);
  
        if (selectResult.recordset.length > 0) {
          const updatedBook = selectResult.recordset[0];
          return new Book(updatedBook.book_id, updatedBook.title, updatedBook.author, updatedBook.availability);
        } 
        
        else {
          throw new Error(`Book with ID ${book_id} not found`);
        }
      } 
      
      else {
        throw new Error(`Book with ID ${book_id} not found`);
      }
    } 
    
    catch (error) {
      console.error("Error updating availability:", error);
      throw error;
    } 
    
    finally {
      if (connection) {
        connection.close();
      }
    }
  }
}
  
  

module.exports = Book;
