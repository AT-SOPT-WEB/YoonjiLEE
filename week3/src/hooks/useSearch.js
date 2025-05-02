import { useState } from 'react';

export default function useSearch(members) {
  const [filteredMembers, setFilteredMembers] = useState(members);

  const search = (searchTerm) => {
    if (!searchTerm) {
      setFilteredMembers(members);
      return;
    }
    const filtered = members.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.github.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  return [filteredMembers, search];
} 