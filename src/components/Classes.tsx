import { useState, useMemo, useEffect } from 'react';
import Searchbar from './Searchbar.tsx'; // CHANGE THIS
import Suggested from './Suggested.tsx'; // CHANGE THIS
import Favorites from './Favorites.tsx'; // CHANGE THIS
import type { ClassInfo } from './ClassItem.tsx'; // CHANGE THIS
import { useClassesQuery } from './ClassesQuery.tsx'; // CHANGE THIS

export default function Classes() {
  const { data: classesData, isLoading, isError, error } = useClassesQuery();
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
    if (!classesData) return [];
    if (!searchText) return classesData; // Show all classes if search is empty
    const lowerCaseSearch = searchText.toLowerCase();
    return classesData.filter((item: ClassInfo) => {
      const fullCode = `${item.department}-${item.code}`.toLowerCase();
      const className = item.name.toLowerCase();
      return fullCode.includes(lowerCaseSearch) || className.includes(lowerCaseSearch);
    }).slice(0, 10);
  }, [searchText, classesData]);

  if (isLoading) {
    return <div className="w-[70vw] m-auto text-center p-8">Loading classes...</div>;
  }

  if (isError) {
    return <div className="w-[70vw] m-auto text-center p-8 text-red-500">Error: {error.message}</div>;
  }

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
