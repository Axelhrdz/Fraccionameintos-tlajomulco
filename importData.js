// importData.js
require('dotenv').config(); // Load environment variables

const fs = require('fs/promises'); // Node.js built-in file system module (promise-based)
const mysql = require('mysql2/promise'); // MySQL client (promise-based)

// Database connection pool (same as in server.js)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function importFraccionamientos() {
  let connection; // Declare connection outside try block
  try {
    // 1. Get a connection from the pool
    connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database!');

    // 2. Read the JSON file
    const jsonFilePath = 'data.json'; // Adjust path if your file is elsewhere
    const jsonData = await fs.readFile(jsonFilePath, 'utf8');
    const fraccionamientos = JSON.parse(jsonData);
    console.log(`Read ${fraccionamientos.length} records from ${jsonFilePath}`);

    if (!Array.isArray(fraccionamientos) || fraccionamientos.length === 0) {
      console.log('No fraccionamientos found in JSON file or file is empty array. Exiting.');
      return;
    }

    // 3. Define columns and prepare values for batch insert
    // IMPORTANT: Ensure this list exactly matches your MySQL table columns
    // and the order of `values` mapping.
    const columns = 'nombre, categoria, fecha_fin_convenio, tiene_convenio, pdf_convenio_path, observaciones, autosuficiente';

    const values = fraccionamientos.map(f => [
      f.nombre,
      f.categoria,
      f.fecha_fin_convenio,
      f.tiene_convenio,
      f.pdf_convenio_path,
      f.observaciones,
      f.autosuficiente
    ]);

    // 4. Perform the batch insert
    const sql = `INSERT INTO fraccionamientos (${columns}) VALUES ?`;
    const [result] = await connection.query(sql, [values]);

    console.log(`Successfully inserted ${result.affectedRows} rows into 'fraccionamientos' table.`);

  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    // 5. Release the connection back to the pool
    if (connection) {
      connection.release();
    }
    // End the pool to gracefully close all connections and exit the script
    await pool.end();
    console.log('Database connection pool closed.');
  }
}

// Execute the import function
importFraccionamientos();