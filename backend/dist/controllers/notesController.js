"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.createNote = void 0;
const db_1 = __importDefault(require("../db/db"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    if (typeof content !== 'string' || content.length < 20 || content.length > 301) {
        res.status(400).send('Content must be between 20 and 301 characters');
        return;
    }
    const sql = 'INSERT INTO notes (content) VALUES (?)';
    try {
        const [result] = yield db_1.default.query(sql, [content]);
        res.status(201).send(result);
    }
    catch (err) {
        console.error('Error creating note:', err);
        res.status(500).send('Internal server error');
    }
});
exports.createNote = createNote;
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'SELECT * FROM notes ORDER BY updated_at DESC';
    try {
        const [results] = yield db_1.default.query(sql);
        res.json(results);
    }
    catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).send('Internal server error');
    }
});
exports.getAllNotes = getAllNotes;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content } = req.body;
    if (typeof content !== 'string' || content.length < 20 || content.length > 301) {
        res.status(400).send('Content must be between 20 and 301 characters');
        return;
    }
    const sql = 'UPDATE notes SET content = ? WHERE id = ?';
    try {
        const [result] = yield db_1.default.query(sql, [content, id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Note not found');
        }
        else {
            res.send(result);
        }
    }
    catch (err) {
        console.error('Error updating note:', err);
        res.status(500).send('Internal server error');
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    try {
        const [result] = yield db_1.default.query(sql, [id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Note not found');
        }
        else {
            res.send(result);
        }
    }
    catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Internal server error');
    }
});
exports.deleteNote = deleteNote;
const searchNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { q } = req.query;
    if (typeof q !== 'string') {
        res.status(400).send('Invalid query parameter');
        return;
    }
    const sql = 'SELECT * FROM notes WHERE content LIKE ? ORDER BY updated_at DESC';
    try {
        const [results] = yield db_1.default.query(sql, [`%${q}%`]);
        res.json(results);
    }
    catch (err) {
        console.error('Error searching notes:', err);
        res.status(500).send('Internal server error');
    }
});
exports.searchNotes = searchNotes;
