import { Notes } from "../../types"
import NoteListItem from "../noteListItem/NoteListItem"
import styles from './NoteList.module.css';

interface NoteListProps {
    notes: Notes | null;
}

export default function NoteList({notes}: NoteListProps) {
    return (
        <ul className={styles.list}>
            {notes && notes.map((note)=>(
                <NoteListItem 
                    key={note.id}
                    note={note}
                    />
            ))}
        </ul>
    )
};
