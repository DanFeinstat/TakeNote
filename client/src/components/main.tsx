import { Notes } from "../types";
import NoteList from "./noteList/NoteList";
import NoteListFilter from "./noteListFilter/NoteListFilter";
import styles from './main.module.css';
import AddNote from "./addNote/AddNote";

interface ListViewProps {
    notes: Notes | null;
}

export default function MainPage({notes}: ListViewProps) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Quick Notes</h1>
            <AddNote/>
            <NoteListFilter />
            <h2 className={styles.title}>Your Notes</h2>
            <NoteList notes={notes} />
        </div>
    )
}