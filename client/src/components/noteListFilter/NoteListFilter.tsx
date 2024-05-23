import { memo, useCallback, useRef } from "react";
import { useNotes } from "../../context/NotesContext";
import { useForm } from "../../hooks/useForm";
import styles from './NoteListFilter.module.css';

export default memo(function NoteListFilter() {
    const { loading, setSearchQuery } = useNotes();

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitCallback = useCallback((value:string ) => {
        setSearchQuery(value);
    },[setSearchQuery]);
    
    const onResetCallback = useCallback(() => {
        setSearchQuery('');
    },[setSearchQuery]);

    const {
        value,
        handleInputChange,
        handleSubmit: handleSubmitSearch,
        handleReset: handleReload
    } = useForm({
        initialValue: '',
        onSubmit: onSubmitCallback,
        onReset: onResetCallback,
        resetOnSubmit: false
    });

    return (
        <div className={styles.filter}>
            <input
                className={styles.input}
                disabled={loading}
                type="text"
                placeholder="Search notes"
                value={value}
                onChange={handleInputChange}
                ref={inputRef}
            />
            <div className={styles.nav}>
                <button 
                    className={`${styles.button} ${styles.submit}`} 
                    onClick={handleSubmitSearch} 
                    disabled={loading}
                >
                    Search
                </button>
                <button 
                    className={`${styles.button} ${styles.cancel}`} 
                    onClick={handleReload} 
                    disabled={loading}
                >
                    Reload Notes
                </button>
            </div>
        </div>
    );
});
