import { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="이름으로 검색하기"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>검색</button>
    </form>
  );
};

export default Search;