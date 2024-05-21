import mysql from 'mysql2';

// chose MySQL over SQLite because MySQL is more popular and has more features 
// and if we want to scale the app in the future, it will be easier to do so with MySQL.
// If scaling is not a consideration I'd probablhy switch to SQLite for its simplicity.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'notes_app'
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL notes_app database');
});

export default db;