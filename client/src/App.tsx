import { useCallback, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import { Note, Notes } from './types';
import { NotesProvider } from './context/NotesContext';
import MainPage from './components/main';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
    const [currentNote, setCurrentNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: notes, error, loading, refetch } = useFetch<Notes>(`${API_URL}/api/notes${searchQuery ? `/search?q=${searchQuery}` : ''}`);


  const deleteNote = useCallback(async (id: number) => {
    await fetch(`${API_URL}/api/notes/${id}`, { method: 'DELETE' });
    refetch();
  }, [refetch]);

  const updateNote = useCallback(async (newContent: string) => {
    if (currentNote) {
        await fetch(`${API_URL}/api/notes/${currentNote.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newContent }),
        });
        setCurrentNote(null);
        refetch();
    }
  }, [currentNote, refetch]);

  const createNote = useCallback(async (newContent: string) => {
    await fetch(`${API_URL}/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
    });
    refetch();
    }, [refetch]);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <NotesProvider
    loading={loading}
    currentNote={currentNote}
    setCurrentNote={setCurrentNote}
    createNote={createNote}
    updateNote={updateNote}
    deleteNote={deleteNote}
    setSearchQuery={setSearchQuery}
    >
       <MainPage notes={notes} />
          </NotesProvider>
  );
}

export default App;
