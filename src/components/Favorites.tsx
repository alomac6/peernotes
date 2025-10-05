import { ClassItem } from './ClassItem.tsx';
import type { ClassInfo } from './ClassItem.tsx';

type FavoritesProps = {
  favoriteClasses: ClassInfo[];
  onToggleFavorite: (classInfo: ClassInfo) => void;
}

export default function Favorites({ favoriteClasses, onToggleFavorite }: FavoritesProps) {
  return (
    <div className="w-full mt-8">
      <h2 className="text-xl font-bold mb-2">Favorites</h2>
      <div className="flex flex-wrap justify-start gap-4 min-h-[12vh]">
        {favoriteClasses.length > 0 ? (
           favoriteClasses.map((item) => (
            <ClassItem 
              key={item.id} 
              classInfo={item}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite} 
            />
          ))
        ) : (
          <p className="text-gray-500">You have no favorite classes yet.</p>
        )}
      </div>
    </div>
  );
}