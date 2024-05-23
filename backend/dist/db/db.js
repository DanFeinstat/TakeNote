"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Read SQL file
const sqlFile = path_1.default.join(__dirname, '../sql/schema.sql');
const sql = fs_1.default.readFileSync(sqlFile, 'utf8');
dotenv_1.default.config();
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
}
else {
    // Local setup
    connectionConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
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
