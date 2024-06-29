const sql = require('mssql');
const dbConfig = require('.dbConfig'); //Ensure the path is correct

class Articles {
    constructor(id, title, datePublished, author) {
        this.id
        this.title
        this.datePublished
        this.author
    }

    static async getAllArticles() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Articles`; // Replace with your actual table name
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
          (row) => new Articles(row.id, row.title, row.datePublished, row.author)
        ); // Convert rows to Articles objects
    }

    static async getArticleById(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Articles WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Articles(
                result.recordset[0].id,
                result.recordset[0].title,
                result.recordset[0].datePublished,
                result.recordset[0].author
                )
            : null; // Handle book not found
    }

    static async updateArticle(id, newArticleData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Articles SET title = @title, datePublished = @datePublished, author = @author WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        request.input("title", newArticleData.title || null); // Handle optional fields
        request.input("author", newArticleData.author || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getArticleById(id); // returning the updated book data
    }

    static async deleteArticle(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Articles WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; // Indicate success based on affected rows
    }
}

module.exports = Articles;