import React from 'react';
import styles from './NoteList.module.scss';
import { Note } from '../../common/noteData';

interface NoteListProps {
  notes: Note[];
  onSelect: (id: string) => void;
  selectedId: string;
}

function NoteList({ notes, onSelect, selectedId }: NoteListProps) {
  return (
    <div className={styles.noteList}>
      {notes.map(note => (
        <div
          key={note.id}
          className={`${styles.noteItem} ${note.id === selectedId ? styles.selected : ''}`}
          onClick={() => onSelect(note.id)}
        >
          <div className={styles.title}>{note.title}</div>
          <div className={styles.preview}>{note.content.slice(0, 20)}...</div>
        </div>
      ))}
    </div>
  );
}

export default NoteList; 