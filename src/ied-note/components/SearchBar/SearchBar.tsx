import { Plus, Search } from 'lucide-react'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onAddNote?: () => void
}

function SearchBar({ value, onChange, onAddNote }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <Search size={16} className={styles.searchIcon} />
        <input
          id="search-input"
          type="text"
          placeholder="Search notes (Ctrl + F)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.addBtn} onClick={onAddNote}>
        <Plus size={16} />
      </button>
    </div>
  )
}

export default SearchBar
