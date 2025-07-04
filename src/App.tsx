import { useState } from 'react'
import styles from './App.module.scss'
import { initialNotes } from './common/noteData'
import NoteEditor from './components/NoteEditor/NoteEditor'
import NoteList from './components/NoteList/NoteList'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState(initialNotes)
  const [selectedId, setSelectedId] = useState(notes[0]?.id || '')

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))

  const selectedNote = notes.find((note) => note.id === selectedId)

  const handleContentChange = (value: string) => {
    setNotes(notes.map((note) => (note.id === selectedId ? { ...note, content: value } : note)))
  }

  const handleSelectNote = (id: string) => {
    console.log('选择笔记:', id)
    setSelectedId(id)
  }

  const handleEditNote = (id: string) => {
    // TODO: 实现编辑笔记标题功能
    console.log('编辑笔记:', id)
  }

  const handleDeleteNote = (id: string) => {
    console.log('删除笔记:', id)
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
    
    // 如果删除的是当前选中的笔记，选择下一个笔记
    if (selectedId === id && newNotes.length > 0) {
      const currentIndex = notes.findIndex(note => note.id === id)
      const nextIndex = currentIndex < newNotes.length ? currentIndex : currentIndex - 1
      setSelectedId(newNotes[nextIndex].id)
    } else if (newNotes.length === 0) {
      setSelectedId('')
    }
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SearchBar value={search} onChange={setSearch} />
        <NoteList 
          notes={filteredNotes} 
          onSelect={handleSelectNote} 
          selectedId={selectedId}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </aside>
      <main className={styles.main}>
        {selectedNote ? (
          <NoteEditor value={selectedNote.content} onChange={handleContentChange} />
        ) : (
          <div className={styles.emptyState}>
            <p>请选择一个笔记开始编辑</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
