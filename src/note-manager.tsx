import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

import { useAsyncEffect } from 'ahooks'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import { getNewNote, getNoteContent, getNoteTitle, NoteData } from './common/data/noteData'
import noteManager from './common/data/noteManager'
import { registerHotkey } from './common/lib/hotkey'

import NoteEditor from './components/note-editor/note-editor'
import NoteList from './components/note-list/note-list'
import SearchBar from './components/search-bar/search-bar'

import styles from './note-manager.module.scss'

function NoteManager() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<NoteData[]>([])
  const [selectedId, setSelectedId] = useState(notes[0]?.id || '')

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))

  const selectedNote = notes.find((note) => note.id === selectedId)

  useAsyncEffect(async () => {
    const notes = await noteManager.loadNotes()
    setNotes(notes)
  }, [])

  const handleContentChange = async (value: string) => {
    setNotes(
      notes.map((note) =>
        note.id === selectedId ? { ...note, content: value, title: getNoteTitle(value), subtitle: getNoteContent(value) } : note
      )
    )

    console.log('更新笔记:', value)
    if (selectedNote) await noteManager.saveNote(selectedNote)
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
        const webview = new WebviewWindow(`note-${id}`, {
          url: `pages/index-note-widget.html?id=${id}`,
          x: note.position.x,
          y: note.position.y,
          width: note.position.width,
          height: note.position.height,
          decorations: false,
          transparent: true,
          resizable: true,
          shadow: false,
          skipTaskbar: true
        })

        webview.once('tauri://error', function (e) {
          console.log('🚀 ~ error:', e)
        })
      }
    } catch (error) {
      console.error('打开独立窗口失败:', error)
    }
  }

  const handleDeleteNote = async (id: string) => {
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

    console.log('删除笔记:', id)
    await noteManager.deleteNote(id)
  }

  const handleAddNote = async () => {
    const newNote = getNewNote()

    setNotes([newNote, ...notes])
    setSelectedId(newNote.id)
    setSearch('') // 清空搜索，显示新笔记

    console.log('添加笔记')
    await noteManager.saveNote(newNote)

    handleOpenInWindow(newNote.id)
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NoteManager />
  </React.StrictMode>
)

registerHotkey()

