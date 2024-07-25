module.exports = {
  user: "practical11", // Replace with your SQL Server login username
  password: "prac123", // Replace with your SQL Server login password
  server: "localhost",
  database: "prac11_db",
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};