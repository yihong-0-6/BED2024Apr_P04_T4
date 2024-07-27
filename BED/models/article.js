// EdisonChewJiaJun S10244576H
const sql = require('mssql');
const dbConfig = require('../../dbconfig')

// Article entity with properties for 'ID', 'Title', 'Author', 'Published_Date'
class Articles {
    constructor(ID, Title, Description, Author, Published_Date) {
        this.ID = ID
        this.Title = Title
        this.Description = Description
        this.Author = Author
        this.Published_Date = Published_Date
        this.ImageUrl = `/Images/articlesimage${this.ID}.jpg`; 
        console.log(`ImageUrl for ${this.Title}: ${this.ImageUrl}`);
    }

    static async getAllArticles() {
        const connection = await sql.connect(dbConfig);
    
        // Retrieves all articles from the 'Articles' table using the 'SELECT *' query
        const sqlQuery = `SELECT * FROM Articles`; // Replace with your actual table name
    
        // It establishes a connection, executes the query, parses the results
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        // It closes the connection
        connection.close();
    
        // Return an array of 'Articles' objects constructed from the retrieved data.
        return result.recordset.map(
          (row) => new Articles(row.ID, row.Title, row.Description, row.Author, row.Published_Date)
        ); // Convert rows to Articles objects
    }

    static async getArticleById(ID) {
        const connection = await sql.connect(dbConfig);
        
        // Retrieves a specific book by its ID using a parameterized query to prevent SQL injection vulnerabilities
        const sqlQuery = `SELECT * FROM Articles WHERE ID = @ID`; // Parameterized query
    
        // It takes an `id` parameter, connects to the database, executes the query with the provided ID
        const request = connection.request();
        request.input("ID", ID);
        const result = await request.query(sqlQuery);
    
        // It closes the connection upon completion
        connection.close();
        
        // Returns either a `Article` object if found or `null` if not found
        return result.recordset[0]
            ? new Articles(
                result.recordset[0].ID,
                result.recordset[0].Title,
                result.recordset[0].Description,
                result.recordset[0].Author,
                result.recordset[0].Published_Date
                )
            : null; // Handle article not found
    }

    static async updateArticle(ID, newArticleData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Articles SET Title = @Title, Author = @Author WHERE ID = @ID`; // Parameterized query
    
        const request = connection.request();
        // This line sets the value for the `@ID` parameter in the query using the provided `ID` value.
        request.input("ID", ID);
        // This line sets the value for the `@title` parameter. It uses the optional chaining operator (`||`) to check if `newArticleData.title` exists
        request.input("Title", newArticleData.Title); // Handle optional fields
        request.input("Author", newArticleData.Author);
        
        // This line asynchronously executes the prepared SQL query with the set parameters.
        await request.query(sqlQuery);

        
    
        connection.close();
        
        // This line (commented as a consideration) retrieves the updated book record using the `getBookById` method
        return this.getArticleById(ID); // returning the updated book data
    }

    static async deleteArticle(ID) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Articles WHERE ID = @ID`; // Parameterized query
    
        const request = connection.request();
        request.input("ID", ID);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
    }
}

module.exports = Articles;