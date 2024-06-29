const sql = require('mssql');
const dbConfig = require('.dbConfig'); 

class Movie {
    constructor(id, name, publishedYear, director, country) {
        this.id = id;
        this.name = name;
        this.publishedYear = publishedYear;
        this.director = director;
        this.country = country;
    }

    static async getAllMovies() {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Movies`;
        const request = connection.request();
        const result = await request.query(sqlQuery);
        connection.close();
        return result.recordset.map(
          (row) => new Movie(row.ID, row.Name, row.Published_Year, row.Director, row.Country)
        );
    }

    static async getMovieById(id) {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Movies WHERE ID = @id`;
        const request = connection.request();
        request.input("id", sql.Int, id);
        const result = await request.query(sqlQuery);
        connection.close();
        return result.recordset[0]
            ? new Movie(
                result.recordset[0].ID,
                result.recordset[0].Name,
                result.recordset[0].Published_Year,
                result.recordset[0].Director,
                result.recordset[0].Country
                )
            : null;
    }
}

module.exports = Movie;
