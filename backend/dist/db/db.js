"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let connectionConfig;
let sql;
if (process.env.CLEARDB_DATABASE_URL) {
    // Heroku ClearDB setup
    const url = new URL(process.env.CLEARDB_DATABASE_URL);
    connectionConfig = {
        host: url.hostname,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1), // Remove leading '/' from pathname
        multipleStatements: true
    };
    sql = `CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content VARCHAR(300) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;
}
else {
    // Local setup
    connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    };
    sql = `CREATE DATABASE IF NOT EXISTS notes;

    USE notes; 

    CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content VARCHAR(300) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;
}
const db = mysql2_1.default.createConnection(connectionConfig);
db.connect((err) => {
    if (err)
        throw err;
    console.log('Connected to MySQL notes_app database');
    db.query(sql, (err, _) => {
        if (err)
            throw err;
        console.log('Database and tables created...');
        db.end();
    });
});
exports.default = db;
