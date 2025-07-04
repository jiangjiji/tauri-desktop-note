import React from 'react'
import styles from './NoteEditor.module.scss'

interface NoteEditorProps {
  value: string
  onChange: (value: string) => void
}

function NoteEditor({ value, onChange }: NoteEditorProps) {
  return (
    <div className={styles.editor}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textarea}
        placeholder="在这里编辑笔记内容..."
      />
    </div>
  )
}

export default NoteEditor
