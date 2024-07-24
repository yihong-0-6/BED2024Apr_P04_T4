const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Movies {
    constructor(ID, Name, Published_Year, Director, Country) {
        this.ID = ID;
        this.Name = Name;
        this.Published_Year = Published_Year;
        this.Director = Director;
        this.Country = Country;
        this.ImageUrl = `/Images/moviesimage${this.ID}.jpg`; 
    }

    static async getAllMovies() {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Movies`;
        const request = connection.request();
        const result = await request.query(sqlQuery);
        connection.close();
        return result.recordset.map(
            (row) => new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country)
        );
    }

    static async getFirstSixMovies() {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT TOP 6 * FROM Movies ORDER BY ID`;
        const request = connection.request();
        const result = await request.query(sqlQuery);
        connection.close();
        return result.recordset.map(
            (row) => new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country)
        );
    }

    static async getMovieById(ID) {
        try {
            const connection = await sql.connect(dbConfig);
            const sqlQuery = `SELECT * FROM Movies WHERE ID = @ID`;
            const request = connection.request();
            request.input("ID", sql.Int, ID); // Ensure correct type is used
            const result = await request.query(sqlQuery);
            console.log(`Database query result for ID ${ID}: ${JSON.stringify(result.recordset)}`);
            connection.close();
            if (result.recordset.length > 0) {
                const row = result.recordset[0];
                return new Movies(row.ID, row.Name, row.Published_Year, row.Director, row.Country);
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error in getMovieById query:', error);
            throw error;
        }
    }
}
module.exports = Movies;
