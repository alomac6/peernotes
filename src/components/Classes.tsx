import { useState, useMemo, useEffect } from 'react';
import Searchbar from './Searchbar.tsx';
import Suggested from './Suggested.tsx';
import Favorites from './Favorites.tsx';
import type { ClassInfo } from './ClassItem.tsx';

const test_map: ClassInfo[] = [
  { id: 1, department: 'CSE', code: '1310', name: 'Intro to Programming'},
  { id: 2, department: 'CSE', code: '1320', name: 'Intermediate Programming' },
  { id: 3, department: 'CSE', code: '2312', name: 'Computer Organization' },
  { id: 4, department: 'CSE', code: '2320', name: 'Algorithms & Data Structures' },
  { id: 5, department: 'MATH', code: '1426', name: 'Calculus I' },
  { id: 6, department: 'MATH', code: '2425', name: 'Calculus II' },
  { id: 7, department: 'PHYS', code: '1443', name: 'Physics for Engineers I' },
];

export default function Classes() {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState<ClassInfo[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteClasses') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (classInfo: ClassInfo) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === classInfo.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== classInfo.id);
    } else {
      updatedFavorites = [...favorites, classInfo];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteClasses', JSON.stringify(updatedFavorites));
  };

  const favoriteIds = useMemo(() => favorites.map(fav => fav.id), [favorites]);

  const suggestedClasses = useMemo(() => {
    if (!searchText) return [];
    const lowerCaseSearch = searchText.toLowerCase();
    return test_map.filter(item => {
      const fullCode = `${item.department}-${item.code}`.toLowerCase();
      const className = item.name.toLowerCase();
      return fullCode.includes(lowerCaseSearch) || className.includes(lowerCaseSearch);
    }).slice(0, 10);
  }, [searchText]);

  return (
    <div className='w-[70vw] min-h-[80vh] m-auto flex flex-col justify-center text-black'>
      <Searchbar onSearchChange={setSearchText} />
      
      {searchText && (
        <Suggested 
          suggestedClasses={suggestedClasses} 
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <Favorites 
        favoriteClasses={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}