// App.jsx

import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import { members } from './components/members';
import useSearch from './hooks/useSearch';
import './App.css';

function App() {
  const [filteredMembers, search] = useSearch(members);

  return (
    <div className="app">
      <Header />
      <Search onSearch={search} />
      <Card members={filteredMembers} />
    </div>
  );
}

export default App;
