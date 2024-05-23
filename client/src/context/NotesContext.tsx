import React, { createContext, useContext } from 'react';
import { Note } from '../types';

interface NotesContextProps {
    loading: boolean;
    addNote: boolean;
    editing: boolean;
    setEditing: (editing: boolean) => void;
    setAddNote: (addNote: boolean) => void;
    setSearchQuery: (query: string) => void;
    currentNote:  Note | null;
    setCurrentNote: (note: Note | null) => void;
    updateNote: (newContent: string) => void;
    deleteNote: (id: number) => void;
    createNote: (newContent: string) => void;
    refetch: () => void;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

interface NotesProviderProps extends NotesContextProps { children?: React.ReactNode };

export const NotesProvider: React.FC<NotesProviderProps> = ({ children, ...props }) => {

    return (
        <NotesContext.Provider value={props}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = (): NotesContextProps => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};
