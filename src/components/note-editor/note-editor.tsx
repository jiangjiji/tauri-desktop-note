import { SimpleEditor } from '@/tiptap/components/tiptap-templates/simple/simple-editor'
import styles from './note-editor.module.scss'

interface NoteEditorProps {
  value: string
  onChange: (value: string) => void
}

function NoteEditor({ value, onChange }: NoteEditorProps) {
  return (
    <div className={styles.editor}>
      <SimpleEditor value={value} onChange={onChange} />
    </div>
  )
}

export default NoteEditor
