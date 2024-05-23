import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

// Read SQL file
const sqlFile = path.join(__dirname, '../sql/schema.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

console.log(sql);

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'S1eeperd',
    multipleStatements: true
});

// Execute SQL
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');

    db.query(sql, (err, _) => {
        if (err) throw err;
        console.log('Database and tables created...');
        db.end();
    });
});