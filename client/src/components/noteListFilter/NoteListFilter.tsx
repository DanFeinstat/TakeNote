import { memo, useCallback, useRef, useState } from "react";
import { useNotes } from "../../context/NotesContext";
import styles from './NoteListFilter.module.css';

export default memo(function NoteListFilter() {
    const [value, setValue] = useState('');
    const { loading, refetch, setSearchQuery } = useNotes();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, [refetch]);

    const handleSubmitSearch = useCallback(() => {
        setSearchQuery(value);
    }, [value, setSearchQuery]);

    const handleReload = useCallback(() => {
        setValue('');
        setSearchQuery('')
    },[setSearchQuery]);


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
                <button className={`${styles.button} ${styles.submit}`} onClick={handleSubmitSearch} disabled={loading}>Search</button>
                <button className={`${styles.button} ${styles.cancel}`} onClick={handleReload} disabled={loading}>Reload Notes</button>
            </div>
        </div>
    );
});