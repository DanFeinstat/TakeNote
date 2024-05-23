import { Router } from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, searchNotes } from '../controllers/notesController';

const router = Router();

router.post('/notes', createNote);
router.get('/notes', getAllNotes);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);
router.get('/notes/search', searchNotes);

export default router;