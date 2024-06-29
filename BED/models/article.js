const sql = require('mssql');
const dbConfig = require('../dbConfig'); //Ensure the path is correct

class Articles {
    constructor(ID, Title, Author, Published_Date) {
        this.ID
        this.Title
        this.Author
        this.Published_Date
    }

    static async getAllArticles() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Articles`; // Replace with your actual table name
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
          (row) => new Articles(row.ID, row.Title, row.Author, row.Published_Date)
        ); // Convert rows to Articles objects
    }

    static async getArticleById(ID) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Articles WHERE ID = @ID`; // Parameterized query
    
        const request = connection.request();
        request.input("ID", ID);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Articles(
                result.recordset[0].ID,
                result.recordset[0].Title,
                result.recordset[0].Author,
                result.recordset[0].Published_Date
                )
            : null; // Handle article not found
    }

    static async updateArticle(ID, newArticleData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Articles SET Title = @Title, Author = @Author, Published_Date = @Published_Date WHERE ID = @ID`; // Parameterized query
    
        const request = connection.request();
        request.input("ID", ID);
        request.input("Title", newArticleData.Title || null); // Handle optional fields
        request.input("Author", newArticleData.Author || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
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