import {Request, Response} from 'express';
import db from '../db';

export const createNote = (req: Request, res: Response) => {
    const { content } = req.body;
    // validate content
    if(content.length < 20 || content.length > 300){
        return res.status(400).send('Content must be between 20 and 300 characters');
    }
    // if these sql query strings were going to be reused somewhere we'd extract them but since they're not 
    // I'd rather colocate them with the function that uses them for readability
    const sql = 'INSERT INTO notes (content) VALUES (?)';
    db.query(sql, [content], (err, result) => {
        if(err) throw err;
        res.send(result);
    })
}

export const getAllNotes = (req: Request, res: Response) => {
    const sql = "Select * from notes";
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    })
}

export const updateNote = (req: Request, res: Response) => {
    const { id } = req.params;
    const { content} = req.body;
    const sql = 'UPDATE notes SET content = ? WHERE id = ?';

    if(content.length < 20 || content.length > 300){
        return res.status(400).send('Content must be between 20 and 300 characters');
    }

    db.query(sql, [content, id], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
};

export const deleteNote = (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if(err) throw err;
        res.send(result);
    })
}

// If we decide to switch to search via query instead of filtering on the front end 
// (which for example we would want to do if we had multiplayer contributions to a single user/user group)
// Search Notes
// export const searchNotes = (req: Request, res: Response) => {
//     const { q } = req.query;
//     const sql = 'SELECT * FROM notes WHERE content LIKE ?';
//     db.query(sql, [`%${q}%`], (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// };