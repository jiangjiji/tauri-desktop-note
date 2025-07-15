import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

import { useState } from 'react'
import styles from './App.module.scss'
import { getNoteContent, getNoteTitle, initialNotes } from './common/noteData'
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
    setNotes(
      notes.map((note) =>
        note.id === selectedId ? { ...note, content: value, title: getNoteTitle(value), subtitle: getNoteContent(value) } : note
      )
    )
  }

  const handleSelectNote = (id: string) => {
    console.log('选择笔记:', id)
    setSelectedId(id)
  }

  const handleEditNote = (id: string) => {
    // TODO: 实现编辑笔记标题功能
    console.log('编辑笔记:', id)
  }

  const handleOpenInWindow = async (id: string) => {
    try {
      const note = notes.find((note) => note.id === id)
      if (note) {
        // 暂时使用浏览器窗口来测试功能
        // 后续会替换为Tauri原生窗口
        const noteData = encodeURIComponent(
          JSON.stringify({
            id: note.id,
            title: note.title,
            content: note.content
          })
        )

        const webview = new WebviewWindow('note', {
          url: 'index-note.html',
          x: 0,
          y: 0,
          width: 800,
          height: 600
        })

        webview.once('tauri://error', function (e) {
          console.log('🚀 ~ error:', e)
        })
      }
    } catch (error) {
      console.error('打开独立窗口失败:', error)
    }
  }

  const handleDeleteNote = (id: string) => {
    console.log('删除笔记:', id)
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)

    // 如果删除的是当前选中的笔记，选择下一个笔记
    if (selectedId === id && newNotes.length > 0) {
      const currentIndex = notes.findIndex((note) => note.id === id)
      const nextIndex = currentIndex < newNotes.length ? currentIndex : currentIndex - 1
      setSelectedId(newNotes[nextIndex].id)
    } else if (newNotes.length === 0) {
      setSelectedId('')
    }
  }

  const handleAddNote = () => {
    const content = '<h1>New Note</h1><p>Start editing your note...</p>'

    const newNote = {
      id: Date.now().toString(),
      title: getNoteTitle(content),
      subtitle: getNoteContent(content),
      content,
      createTime: new Date(),
      updateTime: new Date()
    }

    setNotes([newNote, ...notes])
    setSelectedId(newNote.id)
    setSearch('') // 清空搜索，显示新笔记
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SearchBar value={search} onChange={setSearch} onAddNote={handleAddNote} />
        <NoteList
          notes={filteredNotes}
          onSelect={handleSelectNote}
          selectedId={selectedId}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onOpenInWindow={handleOpenInWindow}
        />
      </aside>
      <main className={styles.main}>
        {selectedNote ? (
          <NoteEditor value={selectedNote.content} onChange={handleContentChange} />
        ) : (
          <div className={styles.emptyState}>
            <p>None Note</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

