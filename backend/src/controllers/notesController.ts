import { Request, Response } from 'express';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../db/db';

export const createNote = async (req: Request, res: Response): Promise<void> => {
    const { content } = req.body;
    
    if (typeof content !== 'string' || content.length < 20 || content.length > 301) {
        res.status(400).send('Content must be between 20 and 301 characters');
        return;
    }

    const sql = 'INSERT INTO notes (content) VALUES (?)';

    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [content]);
        res.status(201).send(result);
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).send('Internal server error');
    }
};

export const getAllNotes = async (req: Request, res: Response): Promise<void> => {
    const sql = 'SELECT * FROM notes ORDER BY updated_at DESC';

    try {
        const [results] = await pool.query<RowDataPacket[]>(sql);
        res.json(results);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).send('Internal server error');
    }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { content } = req.body;

    if (typeof content !== 'string' || content.length < 20 || content.length > 301) {
        res.status(400).send('Content must be between 20 and 301 characters');
        return;
    }

    const sql = 'UPDATE notes SET content = ? WHERE id = ?';

    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [content, id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Note not found');
        } else {
            res.send(result);
        }
    } catch (err) {
        console.error('Error updating note:', err);
        res.status(500).send('Internal server error');
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';

    try {
        const [result] = await pool.query<ResultSetHeader>(sql, [id]);
        if (result.affectedRows === 0) {
            res.status(404).send('Note not found');
        } else {
            res.send(result);
        }
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Internal server error');
    }
};

export const searchNotes = async (req: Request, res: Response): Promise<void> => {
    const { q } = req.query;

    if (typeof q !== 'string') {
        res.status(400).send('Invalid query parameter');
        return;
    }

    const sql = 'SELECT * FROM notes WHERE content LIKE ? ORDER BY updated_at DESC';

    try {
        const [results] = await pool.query<RowDataPacket[]>(sql, [`%${q}%`]);
        res.json(results);
    } catch (err) {
        console.error('Error searching notes:', err);
        res.status(500).send('Internal server error');
    }
};
