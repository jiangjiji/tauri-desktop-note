import { useState } from 'react'
import NoteEditor from './components/note-editor/note-editor'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { NoteData } from './common/data/noteData'

import { useAsyncEffect } from 'ahooks'
import { MoreVertical, Pin, Plus } from 'lucide-react'
import noteManager from './common/data/noteManager'
import styles from './note-widget.module.scss'

function NoteWindow() {
  const [note, setNote] = useState<NoteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPinned, setIsPinned] = useState(false)

  useAsyncEffect(async () => {
    try {
      // 从URL参数中获取笔记数据
      const urlParams = new URLSearchParams(window.location.search)
      const noteID = urlParams.get('id')

      if (!noteID) throw new Error('笔记ID不存在')

      const noteData = await noteManager.readNoteByID(noteID)
      setNote(noteData)
      setIsPinned(noteData.isPin)
    } catch (error) {
      console.error('初始化笔记失败:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleContentChange = async (value: string) => {
    if (note) {
      setNote({
        ...note,
        content: value,
        updateTime: new Date()
      })

      // 这里可以添加保存到本地存储或数据库的逻辑
      console.log('笔记内容已更新:', value)

      await noteManager.saveNote(note)
    }
  }

  const handleAddNote = () => {
    // 添加新笔记的逻辑
    console.log('添加新笔记')
  }

  const handleTogglePin = async () => {
    if (note) {
      const newPinState = !isPinned
      setIsPinned(newPinState)

      const updatedNote = {
        ...note,
        isPin: newPinState,
        updateTime: new Date()
      }

      setNote(updatedNote)
      await noteManager.saveNote(updatedNote)
      console.log('切换图钉状态:', newPinState)
    }
  }

  const handleMoreOptions = () => {
    // 更多选项的逻辑
    console.log('显示更多选项')
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>Failed to load note</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header} data-tauri-drag-region>
        <div className={styles.headerContent} data-tauri-drag-region>
          <h1 className={styles.title} data-tauri-drag-region>
            {note.title}
          </h1>
          <div className={styles.headerActions}>
            <button className={styles.actionButton} onClick={handleAddNote} title="Add New Note">
              <Plus size={16} />
            </button>
            <button
              className={`${styles.actionButton} ${isPinned ? styles.pinned : ''}`}
              onClick={handleTogglePin}
              title={isPinned ? 'Unpin Note' : 'Pin Note'}
            >
              <Pin size={16} />
            </button>
            <button className={styles.actionButton} onClick={handleMoreOptions} title="More Options">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <NoteEditor isWidget={true} value={note.content} onChange={handleContentChange} />
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('note-widget') as HTMLElement).render(
  <React.StrictMode>
    <NoteWindow />
  </React.StrictMode>
)
