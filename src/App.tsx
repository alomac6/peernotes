import { useState, useMemo, useEffect } from 'react';
import Searchbar from './components/Searchbar.tsx';
import Suggested from './components/Suggested.tsx';
import Favorites from './components/Favorites.tsx';
import type { ClassInfo } from './components/ClassItem.tsx';

const test_map: ClassInfo[] = [
  { id: 1, department: 'CSE', code: '1310', name: 'Intro to Programming'},
  { id: 2, department: 'CSE', code: '1320', name: 'Intermediate Programming' },
  { id: 3, department: 'CSE', code: '2312', name: 'Computer Organization' },
  { id: 4, department: 'CSE', code: '2320', name: 'Algorithms & Data Structures' },
  { id: 5, department: 'MATH', code: '1426', name: 'Calculus I' },
];

export default function App() {
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
    if (!searchText) return test_map;
    const lowerCaseSearch = searchText.toLowerCase();
    return test_map.filter(item => {
      const fullCode = `${item.department}-${item.code}`.toLowerCase();
      const className = item.name.toLowerCase();
      return fullCode.includes(lowerCaseSearch) || className.includes(lowerCaseSearch);
    }).slice(0, 10);
  }, [searchText, test_map]);

  return (
    <div className='w-[70vw] min-h-[80vh] m-auto flex flex-col justify-center text-black'>
      <Searchbar onSearchChange={setSearchText} />
      
      <Suggested 
        suggestedClasses={suggestedClasses} 
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />

      <Favorites 
        favoriteClasses={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}