import { memo, useCallback, useState } from "react";
import { useNotes } from "../../context/NotesContext";
import styles from './AddNote.module.css';

export default memo(function AddNote() {
    const { loading, createNote } = useNotes();
    const [ value, setValue ] = useState('');
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        if(errorDetails){
         setErrorDetails(null);
        }
    }, [setValue]);

    const handleSubmit = useCallback((event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedContent = value.trim();
        if(trimmedContent.length > 20 && value.length < 301){
                createNote(value)
                handleReset();
        } else {
            setErrorDetails(`Note must be between 20 and 300 characters, but is ${trimmedContent.length} characters long`);
        }
    }, [createNote, value]);

    const handleReset = useCallback(() => {
        setValue('');
        setErrorDetails(null);
    }, [setValue]);

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
                 {errorDetails && <p className={styles.error}>{errorDetails}</p>}
                 <div className={styles.nav}>
                    <button 
                        className={`${styles.button} ${styles.submit}`}
                        type="submit" 
                    >
                        Add Note
                    </button>
                    <button 
                        className={`${styles.button} ${styles.cancel}`}
                        type="reset" 
                        onClick={handleReset}
                    >Cancel</button>
                 </div>
            </form>
        </div>
    )
});