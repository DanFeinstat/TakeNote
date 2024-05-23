import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

interface ConnectionConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  multipleStatements: boolean;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
}

let connectionConfig: ConnectionConfig;

if (process.env.CLEARDB_DATABASE_URL) {
  // Heroku ClearDB setup
  const url = new URL(process.env.CLEARDB_DATABASE_URL);
  connectionConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // Remove leading '/' from pathname
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

} else {
  // Local setup
  connectionConfig = {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

const pool = mysql.createPool(connectionConfig);

const initDb = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL notes_app database');
    
    const sql = process.env.CLEARDB_DATABASE_URL ? 
      `CREATE TABLE IF NOT EXISTS notes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          content VARCHAR(300) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );` :
      `CREATE DATABASE IF NOT EXISTS notes;
      USE notes; 
      CREATE TABLE IF NOT EXISTS notes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          content VARCHAR(300) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );`;

    await connection.query(sql);
    console.log('Database and tables created...');
    connection.release();
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
};

initDb();

export default pool;
