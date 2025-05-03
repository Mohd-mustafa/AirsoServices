import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mohd9397085178@',
  database: 'hajjumrah',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
