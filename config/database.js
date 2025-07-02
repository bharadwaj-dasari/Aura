const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  // user: "root",
  password: "zx@123",
  password:"Dileep@1412",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
});

const databaseName = "aura";

connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``, (err) => {
  if (err) {
    console.error("Error creating database:", err.stack);
    return;
  }
  console.log(`Database "${databaseName}" is ready.`);
});

connection.end();

const pool = mysql.createPool({ ...dbConfig, database: databaseName });

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  }
  console.log("Connected to database");
  connection.release();
});

module.exports = pool.promise();
