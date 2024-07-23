module.exports = {
  user: "practical", // Replace with your SQL Server login username
  password: "now123", // Replace with your SQL Server login password
  server: "localhost",
  database: "prac14",
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
};