import React from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="搜索笔记标题 (Ctrl + F)"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.input}
      />
      <button className={styles.addBtn}>+</button>
    </div>
  );
}

export default SearchBar; 