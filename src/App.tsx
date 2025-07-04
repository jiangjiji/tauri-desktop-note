import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import NoteList from './components/NoteList/NoteList';
import NoteEditor from './components/NoteEditor/NoteEditor';
import styles from './App.module.scss';
import { initialNotes } from './common/noteData';

function App() {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(notes[0].id);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  const selectedNote = notes.find(note => note.id === selectedId);

  const handleContentChange = (value: string) => {
    setNotes(notes.map(note =>
      note.id === selectedId ? { ...note, content: value } : note
    ));
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SearchBar value={search} onChange={setSearch} />
        <NoteList notes={filteredNotes} onSelect={setSelectedId} selectedId={selectedId} />
      </aside>
      <main className={styles.main}>
        {selectedNote && (
          <NoteEditor value={selectedNote.content} onChange={handleContentChange} />
        )}
      </main>
    </div>
  );
}

export default App;
