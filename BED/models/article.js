// EdisonChewJiaJun S10244576H

// Importing the `mssql` library to enable database operations with SQL Server.
const sql = require('mssql');

// Importing the database configuration settings from a file located at '../../dbconfig'.
// This file is expected to contain connection details like user, password, server, and database name.
const dbConfig = require('../../dbconfig')

// Article entity with properties for 'ID', 'Title', 'Author', 'Published_Date'
class Articles {
    // Constructor method to initialize an instance of the `Articles` class with given properties.
    constructor(ID, Title, Author, Published_Date) {
        // Assigning the passed ID to the instance property.
        this.ID = ID
        // Assigning the passed Title to the instance property.
        this.Title = Title
        // Assigning the passed Author to the instance property.
        this.Author = Author
        // Assigning the passed Published_Date to the instance property.
        this.Published_Date = Published_Date
        // Constructing an Image URL for the article based on the ID.
        this.ImageUrl = `/Images/articlesimage${this.ID}.jpg`; 
    }

    // Static method to retrieve all articles from the database.
    static async getAllArticles() {
        // Establishing a connection to the database using the provided configuration.
        const connection = await sql.connect(dbConfig);
    
        // Retrieves all articles from the 'Articles' table using the 'SELECT *' query
        const sqlQuery = `SELECT * FROM Articles`;
    
        // It establishes a connection, executes the query, parses the results
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        // It closes the connection
        connection.close();
    
        // Return an array of 'Articles' objects constructed from the retrieved data.
        return result.recordset.map(
          (row) => new Articles(row.ID, row.Title, row.Author, row.Published_Date)
        ); // Convert rows to Articles objects
    }

    static async getArticleById(ID) {
        // Establishing a connection to the database using the provided configuration.
        const connection = await sql.connect(dbConfig);
        
        // Retrieves a specific book by its ID using a parameterized query to prevent SQL injection vulnerabilities
        const sqlQuery = `SELECT * FROM Articles WHERE ID = @ID`;
    
        // Creating a request object to execute the SQL query.
        const request = connection.request();
        // Setting the `ID` parameter for the query to the provided ID value.
        request.input("ID", ID);

        // Executing the query and awaiting the result.
        const result = await request.query(sqlQuery);
    
        // It closes the connection upon completion
        connection.close();
        
        // Checking if the result set is not empty and returning an `Articles` object if found.
        // If no record is found, the method returns `null`.
        return result.recordset[0]
            ? new Articles(
                result.recordset[0].ID,
                result.recordset[0].Title,
                result.recordset[0].Author,
                result.recordset[0].Published_Date
                )
            : null; // Handle article not found
    }

    // Static method to update an article in the database based on its ID.
    static async updateArticle(ID, newArticleData) {
        // Establishing a connection to the database using the provided configuration.
        const connection = await sql.connect(dbConfig);
    
        // SQL query string to update the Title and Author of an article, using a parameterized query.
        const sqlQuery = `UPDATE Articles SET Title = @Title, Author = @Author WHERE ID = @ID`; 
    
        // Creating a request object to execute the SQL query.
        const request = connection.request();
        // This line sets the value for the `@ID` parameter in the query using the provided `ID` value.
        request.input("ID", ID);

        // Setting the `Title` parameter using the new data provided in `newArticleData`.
        request.input("Title", newArticleData.Title);

        // Setting the `Author` parameter using the new data provided in `newArticleData`.
        request.input("Author", newArticleData.Author);
        
        // This line asynchronously executes the prepared SQL query with the set parameters.
        await request.query(sqlQuery);

        
    
        connection.close();
        
        /// Returning the updated article data by calling `getArticleById`.
        // This provides the updated state of the article to the caller.
        return this.getArticleById(ID); // returning the updated book data
    }

    // Static method to delete an article from the database based on its ID.
    static async deleteArticle(ID) {
        // Establishing a connection to the database using the provided configuration.
        const connection = await sql.connect(dbConfig);

        // SQL query string to delete an article based on the ID, using a parameterized query.
        const sqlQuery = `DELETE FROM Articles WHERE ID = @ID`; // Parameterized query
    
         // Creating a request object to execute the SQL query.
        const request = connection.request();

        // Setting the `ID` parameter for the query to the provided ID value.
        request.input("ID", ID);

        // Executing the query to delete the article from the database.
        const result = await request.query(sqlQuery);
    
        connection.close();
        
        // Returning a boolean value indicating whether the deletion was successful.
        // The success is determined by checking if any rows were affected by the query.
        return result.rowsAffected > 0; 
    }
}   

// Exporting the `Articles` class as a module to be used in other parts of the application.
module.exports = Articles;