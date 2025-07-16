import { SimpleEditor } from '@/tiptap/components/tiptap-templates/simple/simple-editor'
import styles from './note-editor.module.scss'

interface NoteEditorProps {
  isWidget: boolean
  value: string
  onChange: (value: string) => void
}

function NoteEditor({ isWidget, value, onChange }: NoteEditorProps) {
  return (
    <div className={styles.editor}>
      <SimpleEditor isWidget={isWidget} value={value} onChange={onChange} />
    </div>
  )
}

export default NoteEditor
