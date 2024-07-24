const sql = require('mssql');
const dbConfig = require('../dbConfig')

class Admins{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    static async adminLogin(email, password) {
        const connection = await sqll.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Admins WHERE email = @email`;
        const request = connection.request();

        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);

        const result = await request.query(sqlQuery);

        connection.clost();

        if (result.recordset.length > 0) {
            return result.recordset[0];
        } 
        else {
            return null;
        }
    }

    static async getAdminByEmail(adminEmail) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Admins WHERE email = @email`; // Parameterized query
    
        const request = connection.request();
        request.input("userEmail", userEmail);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Admins(
              result.recordset[0].userEmail,
              result.recordset[0].password,
            )
          : null;
      }

      //Yi Hong
      static async addAdmin(adminData) {
        let connection;
        try {
          connection = await sql.connect(dbConfig);
    
          const sqlQuery = `INSERT INTO Admins (email, password) 
          VALUES (@email, @password)`;
    
          const request = connection.request();
          request.input('email', sql.VarChar, adminData.email);
          request.input('password', sql.VarChar, adminData.password);
    
          await request.query(sqlQuery);
        } 
        
        catch (error) {
          console.error('Error adding admin:', error);
          throw error;
        } 
        
        finally {
          if (connection) {
            connection.close();
          }
        }
      }

      static async getAllAdmins() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT email, password FROM Admins`;
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close(); 
    
        return result.recordset.map(
          (row) => new User(row.email, row.password)
        ); // Convert rows to Admin objects
      }

      static async createAdmin(newAdminData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Admins (email, password) 
        VALUES (@email, @password);`
    
        const request = connection.request();
        request.input("email", newAdminsData.email)
        request.input("password", newAdminsData.password);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getAllAdmins();
      }

      static async updateAdmin(adminEmail, newAdminData) {
        const createdAdmin = await this.getAdminByEmail(adminEmail);
        const connection = await sql.connect(dbConfig);
        
        const sqlQuery = `UPDATE Admins SET email = @email, 
                                password = @password WHERE userEmail = @userEmail`; // Parameterized query
    
        const request = connection.request();
        request.input("email", newAdminData.email || createdAdmin.email);
        request.input("password", newAdminData.password || createdAdmin.password);
    
        await request.query(sqlQuery);
        
        connection.close();
    
        return this.getAdminByEmail(adminEmail);
      }

      static async deleteAdmin(email) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM Admins WHERE email = @email`; // Parameterized query
    
        const request = connection.request();
        request.input("email", email);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0; 
      }
}   


module.export = Admins;