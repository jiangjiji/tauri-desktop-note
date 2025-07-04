import { NoteData } from '../../common/noteData'
import styles from './NoteList.module.scss'
import NoteListItem from './NoteListItem'

interface NoteListProps {
  notes: NoteData[]
  onSelect: (id: string) => void
  selectedId: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

function isToday(date: Date) {
  const now = new Date()
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
}

function isLastWeek(date: Date) {
  const now = new Date()
  const lastWeek = new Date(now)
  lastWeek.setDate(now.getDate() - 7)
  return date > lastWeek && !isToday(date)
}

function NoteList({ notes, onSelect, selectedId, onEdit, onDelete }: NoteListProps) {
  // 先排序，后分组
  const sortedNotes = [...notes].sort((a, b) => b.createTime.getTime() - a.createTime.getTime())
  const todayNotes = sortedNotes.filter((n) => isToday(n.createTime))
  const lastWeekNotes = sortedNotes.filter((n) => isLastWeek(n.createTime))
  const lastMonthNotes = sortedNotes.filter((n) => !isToday(n.createTime) && !isLastWeek(n.createTime))

  return (
    <div className={styles.noteList}>
      {todayNotes.length > 0 && (
        <div>
          <div className={styles.groupTitle}>Today</div>
          {todayNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedId}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {lastWeekNotes.length > 0 && (
        <div>
          <div className={styles.groupTitle}>Last Week</div>
          {lastWeekNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedId}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {lastMonthNotes.length > 0 && (
        <div>
          <div className={styles.groupTitle}>Last Month</div>
          {lastMonthNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedId}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteList
