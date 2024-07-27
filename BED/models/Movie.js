const sql = require('mssql'); // Import the mssql package to interact with SQL Server
const dbConfig = require('../../dbconfig'); // Import the database configuration

class Movies {
    // Constructor to initialize a new movie object
    constructor(ID, Name, Published_Year, Director, Country, Description, TrailerUrl) {
        this.ID = ID;
        this.Name = Name;
        this.Published_Year = Published_Year;
        this.Director = Director;
        this.Country = Country;
        this.Description = Description;
        this.TrailerUrl = TrailerUrl;
        this.ImageUrl = `/Images/moviesimage${this.ID}.jpg`; // Set the image URL based on the movie ID
    }

    // Static method to fetch all movies from the database
    static async getAllMovies() {
        const connection = await sql.connect(dbConfig); // Connect to the database
        const sqlQuery = `SELECT * FROM Movies`; // SQL query to select all movies
        const request = connection.request(); // Create a new SQL request
        const result = await request.query(sqlQuery); // Execute the query
        connection.close(); // Close the database connection
        // Map the result set to movie objects
        return result.recordset.map(
            (row) => new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country, row.Description, row.TrailerUrl)
        );
    }

    // Static method to fetch the first six movies from the database
    static async getFirstSixMovies() {
        try {
            const connection = await sql.connect(dbConfig); // Connect to the database
            const sqlQuery = `SELECT TOP 6 * FROM Movies ORDER BY ID`; // SQL query to select the first six movies
            const request = connection.request(); // Create a new SQL request
            const result = await request.query(sqlQuery); // Execute the query
            console.log(`Database query result for first six movies: ${JSON.stringify(result.recordset)}`); // Log the query result
            connection.close(); // Close the database connection
            // Map the result set to movie objects
            return result.recordset.map(row => new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country, row.Description, row.TrailerUrl));
        } catch (error) {
            console.error('Error in getFirstSixMovies query:', error); // Log any errors
            throw error; // Throw the error to be handled by the calling function
        }
    }

    // Static method to fetch a movie by its ID from the database
    static async getMovieById(ID) {
        try {
            const connection = await sql.connect(dbConfig); // Connect to the database
            const sqlQuery = `SELECT * FROM Movies WHERE ID = @ID`; // SQL query to select a movie by its ID
            const request = connection.request(); // Create a new SQL request
            request.input("ID", sql.Int, ID); // Ensure the correct type is used for the ID parameter
            const result = await request.query(sqlQuery); // Execute the query
            console.log(`Database query result for ID ${ID}: ${JSON.stringify(result.recordset)}`); // Log the query result
            connection.close(); // Close the database connection
            if (result.recordset.length > 0) {
                const row = result.recordset[0]; // Get the first row from the result set
                // Return a new movie object
                return new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country, row.Description, row.TrailerUrl);
            } else {
                return null; // Return null if no movie is found with the given ID
            }
        } catch (error) {
            console.error('Error in getMovieById query:', error); // Log any errors
            throw error; // Throw the error to be handled by the calling function
        }
    }
}

module.exports = Movies; // Export the Movies class
