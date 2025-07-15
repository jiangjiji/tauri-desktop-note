import { useEffect, useState } from 'react'
import NoteEditor from './components/NoteEditor/NoteEditor'
import styles from './App.module.scss'

interface NoteData {
  id: string
  title: string
  content: string
  createTime: Date
  updateTime: Date
}

function NoteWindow() {
  const [note, setNote] = useState<NoteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initNote = async () => {
      try {
        // 从URL参数中获取笔记数据
        const urlParams = new URLSearchParams(window.location.search)
        const noteParam = urlParams.get('note')
        
        if (noteParam) {
          try {
            const noteData = JSON.parse(decodeURIComponent(noteParam))
            const note: NoteData = {
              id: noteData.id,
              title: noteData.title,
              content: noteData.content,
              createTime: new Date(),
              updateTime: new Date()
            }
            setNote(note)
          } catch (error) {
            console.error('解析笔记数据失败:', error)
            // 如果解析失败，使用默认笔记
            const defaultNote: NoteData = {
              id: 'default',
              title: '新笔记',
              content: '<h1>新笔记</h1><p>开始编辑您的笔记...</p>',
              createTime: new Date(),
              updateTime: new Date()
            }
            setNote(defaultNote)
          }
        } else {
          // 如果没有笔记参数，使用默认笔记
          const defaultNote: NoteData = {
            id: 'default',
            title: '新笔记',
            content: '<h1>新笔记</h1><p>开始编辑您的笔记...</p>',
            createTime: new Date(),
            updateTime: new Date()
          }
          setNote(defaultNote)
        }
      } catch (error) {
        console.error('初始化笔记失败:', error)
      } finally {
        setLoading(false)
      }
    }

    initNote()
  }, [])

  const handleContentChange = (value: string) => {
    if (note) {
      setNote({
        ...note,
        content: value,
        updateTime: new Date()
      })
      
      // 这里可以添加保存到本地存储或数据库的逻辑
      console.log('笔记内容已更新:', value)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>无法加载笔记</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <NoteEditor value={note.content} onChange={handleContentChange} />
      </main>
    </div>
  )
}

export default NoteWindow
