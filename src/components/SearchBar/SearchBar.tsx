import styles from './SearchBar.module.scss'
import { Search, Plus } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="搜索笔记标题 (Ctrl + F)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
      </div>
      <button className={styles.addBtn}>
        <Plus size={16} />
      </button>
    </div>
  )
}

export default SearchBar
