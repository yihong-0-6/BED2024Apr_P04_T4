//Yi Hong S10257222H
const sql = require('mssql');
const dbConfig = require('../../dbconfig') 

//Admins Model
class Admins{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    //Method to handle admin logins
    static async adminLogin(email, password) {
        const connection = await sql.connect(dbConfig); //Connects to sql database

        const sqlQuery = `SELECT * FROM Admins WHERE email = @email`; //Finding the admin in the database
        const request = connection.request();
      
        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);

        const result = await request.query(sqlQuery);

        connection.close();

        if (result.recordset.length > 0) {
            return result.recordset[0];
        } 
        else {
            return null;
        }
    }

    //Method to find admin by email
    static async getAdminsByEmail(email) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Admins WHERE email = @email`; 
    
        const request = connection.request();
        request.input("email", email);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Admins(
              result.recordset[0].email, 
              result.recordset[0].password, 
            )
          : null;
      }

      //Method to display all the admins in database
      static async getAllAdmins() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT email, password FROM Admins`; //Displays both email and password
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close(); 
    
        return result.recordset.map(
          (row) => new Admins(row.email, row.password)
        ); // Convert rows to Admin objects
      }

      //Method to create new admin
      static async createAdmin(newAdminsData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Admins (email, password)  
        VALUES (@email, @password);` //Inserting new admin data into the database
    
        const request = connection.request();
        request.input("email", newAdminsData.email)
        request.input("password", newAdminsData.password);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getAllAdmins(); //Calling method to display all admins in database
      }

      //Method to delete admin in database
      static async deleteAdmin(email) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Admins WHERE email = @email`; //Deleting admin rows by specific email
    
        const request = connection.request();
        request.input("email", sql.VarChar, email);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; 
      }
}   


module.exports = Admins;