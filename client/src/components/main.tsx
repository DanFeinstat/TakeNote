import { useNotes } from "../context/NotesContext";
import { Notes } from "../types";
import NoteList from "./noteList/NoteList";
import NoteListFilter from "./noteListFilter/NoteListFilter";
import styles from './main.module.css';
import AddNote from "./addNote/AddNote";

interface ListViewProps {
    notes: Notes | null;
}

function AddNoteButton() {
    const { setAddNote } = useNotes();
    return (
        <button className={`${styles.button} ${styles.edit}`} onClick={() => setAddNote(true)}>Add Note</button>
    )

}

export default function MainPage({notes}: ListViewProps) {
    return notes ? (
        <div className={styles.container}>
            <h2 className={styles.title}>Your Notes</h2>
            <AddNote/>
            <NoteListFilter />
            <NoteList notes={notes} />
        </div>
    ): (<AddNoteButton />)
}