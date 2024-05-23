"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.createNote = void 0;
const db_1 = __importDefault(require("../db/db"));
const createNote = (req, res) => {
    const { content } = req.body;
    // validate content
    if (content.length < 20 || content.length > 301) {
        return res.status(400).send('Content must be between 20 and 301 characters');
    }
    // if these sql query strings were going to be reused somewhere we'd extract them but since they're not 
    // I'd rather colocate them with the function that uses them for readability
    const sql = 'INSERT INTO notes (content) VALUES (?)';
    db_1.default.query(sql, [content], (err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
};
exports.createNote = createNote;
const getAllNotes = (req, res) => {
    const sql = "SHOW TABLES";
    // const sql = "SELECT * from notes ORDER BY updated_at DESC";
    db_1.default.query(sql, (err, results) => {
        console.log('results');
        console.log('results');
        console.log('results');
        console.log('results');
        console.log('results');
        console.log('results');
        console.log('results');
        console.log(results);
        if (err)
            throw err;
        res.json(results);
    });
};
exports.getAllNotes = getAllNotes;
const updateNote = (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const sql = 'UPDATE notes SET content = ? WHERE id = ?';
    if (content.length < 20 || content.length > 301) {
        return res.status(400).send('Content must be between 20 and 301 characters');
    }
    db_1.default.query(sql, [content, id], (err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
};
exports.updateNote = updateNote;
const deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db_1.default.query(sql, [id], (err, result) => {
        if (err)
            throw err;
        res.send(result);
    });
};
exports.deleteNote = deleteNote;
const searchNotes = (req, res) => {
    const { q } = req.query;
    const sql = 'SELECT * FROM notes WHERE content LIKE ? ORDER BY updated_at DESC';
    db_1.default.query(sql, [`%${q}%`], (err, results) => {
        if (err)
            throw err;
        res.json(results);
    });
};
exports.searchNotes = searchNotes;
