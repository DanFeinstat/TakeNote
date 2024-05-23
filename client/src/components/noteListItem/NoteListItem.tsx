import React, {memo, useCallback, useEffect, useState} from 'react';
import { useNotes } from '../../context/NotesContext';
import { Note } from '../../types';
import styles from './NoteListItem.module.css';


interface NoteListItemProps {
    note: Note;
};

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
    const { id, content } = note;
    const [newContent, setNewContent] = useState(content);
    const [ editing, setEditing] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);
    const inputRef = React.createRef<HTMLTextAreaElement>();
    const {
        loading,
        setCurrentNote,
        updateNote,
        deleteNote
    } = useNotes();

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing, inputRef.current]);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(event.target.value);
         setErrorDetails(null);
    }, [setNewContent])

    const handleClick = useCallback(() => {
        setCurrentNote(note); 
        setEditing(true)
    }, [setCurrentNote, note]); 

    const handleUpdate = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedContent = newContent.trim();
        if(trimmedContent.length > 20 && newContent.length < 301){
            updateNote(newContent);
            setEditing(false);
        } else {
            setErrorDetails(`Note must be between 20 and 300 characters, but is ${trimmedContent.length} characters long`);
        }
    }, [updateNote, newContent]);

    const handleDelete = useCallback(() => {deleteNote(id)}, [deleteNote, id]);

    const handleCancel = useCallback(() =>{
        setEditing(false);
        setCurrentNote(null);
    },[setEditing, setCurrentNote])

    return editing ? (
        <form onSubmit={handleUpdate} className={styles.form}>
            <textarea
                className={`${styles.textarea} ${errorDetails ? styles.error : ''}`}
                disabled={loading}
                placeholder="Write your note here..."
                value={newContent}
                onChange={handleInputChange}
                ref={inputRef}
            />
            {errorDetails && <p className={styles.error}>{errorDetails}</p>}
            <div className={styles.nav}>
                <button type="submit" className={`${styles.button} ${styles.submit}`}>Submit</button>
                <button className={`${styles.button} ${styles.cancel}`} onClick={() => {handleCancel()}}>Cancel</button>
            </div>
        </ form>
    ) : (
        <li className={styles.item} >
                <p className={styles.content} >
                    <span onClick={handleClick} >{content}</span>
                    <button className={styles.delete} onClick={handleDelete}>Delete</button>
                </p>
        </li>
    );
};

export default memo(NoteListItem);