import React, { memo, useEffect, useState } from 'react';
import { useNotes } from '../../context/NotesContext';
import { Note } from '../../types';
import { useForm } from '../../hooks/useForm';
import styles from './NoteListItem.module.css';
import validateNote from '../../utils/validateNote';

interface NoteListItemProps {
    note: Note;
};

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
    const { id, content } = note;
    const [editing, setEditing] = useState(false);
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
    }, [editing, inputRef]);

    const {
        value: newContent,
        errorDetails,
        handleInputChange,
        handleSubmit,
        handleReset
    } = useForm({
        initialValue: content,
        validate: validateNote,
        onSubmit: (newContent) => {
            updateNote(newContent);
            setEditing(false);
        }
    });

    const handleClick = () => {
        setCurrentNote(note); 
        setEditing(true);
    };

    const handleDelete = () => {
        deleteNote(id);
    };

    const handleCancel = () => {
        setEditing(false);
        setCurrentNote(null);
        handleReset();
    };

    return editing ? (
        <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
                className={`${styles.textarea} ${errorDetails ? styles.error : ''}`}
                disabled={loading}
                placeholder="Write your note here..."
                value={newContent}
                onChange={handleInputChange}
                ref={inputRef}
            />
            {errorDetails && <p className={styles.errortext}>{errorDetails}</p>}
            <div className={styles.nav}>
                <button type="submit" className={`${styles.button} ${styles.submit}`} disabled={loading}>Submit</button>
                <button className={`${styles.button} ${styles.cancel}`} onClick={handleCancel} disabled={loading}>Cancel</button>
            </div>
        </ form>
    ) : (
        <li className={styles.item}>
            <div className={styles.content}>
                <p className={styles.text} onClick={handleClick}>{content}</p>
                <button className={styles.delete} onClick={handleDelete}>Delete</button>
            </div>
        </li>
    );
};

export default memo(NoteListItem);
