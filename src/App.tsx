import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Frown } from 'lucide-react';
import Searchbar from './components/Searchbar.tsx';
import Suggested from './components/Suggested.tsx';
import Favorites from './components/Favorites.tsx';
import type { ClassInfo } from './components/ClassItem.tsx';
type ApiCourse = {
  department: string;
  code: string;
  course_name: string;
};

export default function App() {
  const { 
    data: allClassData = [],
    isLoading, 
    error 
  } = useQuery<ClassInfo[]>({
    queryKey: ['classes'],
    queryFn: async () => {
      const response = await fetch('https://jayson-willowy-deceivingly.ngrok-free.dev/courses', {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      }); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const apiData: ApiCourse[] = await response.json();
      return apiData.map((course, index) => ({
        id: index,
        department: course.department,
        code: course.code,
        name: course.course_name,
      }));
    },
  });

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
    return allClassData.filter(item => {
      const fullCode = `${item.department}-${item.code}`.toLowerCase();
      const className = item.name.toLowerCase();
      return fullCode.includes(lowerCaseSearch) || className.includes(lowerCaseSearch);
    }).slice(0, 8);
  }, [searchText, allClassData]);

  if (isLoading) {
    return (
      <div className='w-[70vw] min-h-[80vh] m-auto flex flex-col justify-center items-center text-black'>
        <p>Loading classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-[70vw] min-h-[80vh] m-auto flex flex-col justify-center items-center text-black gap-4'>
        <Frown className="text-orange-500" size={64} />
        <p className="text-xl text-gray-600">I wasn't able to fetch classes</p>
      </div>
    );
  }

  return (
    <div className='w-[70vw] min-h-[80vh] m-auto flex flex-col justify-center text-black'>
      <Searchbar onSearchChange={setSearchText} />
      
      <Suggested 
        suggestedClasses={suggestedClasses} 
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        searchText={searchText}
      />

      <Favorites 
        favoriteClasses={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}