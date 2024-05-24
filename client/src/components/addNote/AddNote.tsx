import { memo } from "react";
import { useNotes } from "../../context/NotesContext";
import { useForm } from "../../hooks/useForm";
import validateNote from "../../utils/validateNote";
import styles from './AddNote.module.css';


export default function AddNote() {
    const { loading, createNote } = useNotes();

    const {
        value,
        errorDetails,
        handleInputChange,
        handleSubmit,
        handleReset
    } = useForm({
        initialValue: '',
        validate: validateNote,
        onSubmit: createNote
    });

    return (
        <div>
            <form className={styles.container} onSubmit={handleSubmit}>
                <label htmlFor="addNote">Add Note:</label>
                <textarea 
                    className={`${styles.textarea} ${errorDetails ? styles.error : ''}`}
                    id="addNote" 
                    name="addNote" 
                    placeholder="Write your note here..."
                    value={value}
                    onChange={handleInputChange}
                    disabled={loading}
                 />
                 {errorDetails && <p className={styles.errortext}>{errorDetails}</p>}
                 <div className={styles.nav}>
                    <button 
                        className={`${styles.button} ${styles.submit}`}
                        type="submit" 
                        disabled={loading}
                    >
                        Add Note
                    </button>
                    <button 
                        className={`${styles.button} ${styles.cancel}`}
                        type="reset" 
                        onClick={handleReset}
                        disabled={loading}
                    >Cancel</button>
                 </div>
            </form>
        </div>
    );
};
