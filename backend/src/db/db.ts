import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Read SQL file
const sqlFile = path.join(__dirname, './sql/schema.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

dotenv.config();

let connectionConfig;

if (process.env.CLEARDB_DATABASE_URL) {
  // Heroku ClearDB setup
  const url = new URL(process.env.CLEARDB_DATABASE_URL);
  connectionConfig = {
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1) // Remove leading '/' from pathname
  };
} else {
  // Local setup
  connectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
}

const db = mysql.createConnection(connectionConfig);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL notes_app database');
  
  db.query(sql, (err, _) => {
      if (err) throw err;
      console.log('Database and tables created...');
      db.end();
    });
});

export default db;
