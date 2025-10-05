import { ClassItem } from './ClassItem.tsx';
import type { ClassInfo } from './ClassItem.tsx';

type SuggestedProps = {
  suggestedClasses: ClassInfo[];
  favoriteIds: number[];
  onToggleFavorite: (classInfo: ClassInfo) => void;
  searchText: string;
}

export default function Suggested({ suggestedClasses, favoriteIds, onToggleFavorite, searchText }: SuggestedProps) {
  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-bold mb-2">Suggested</h2>
      <div className="flex flex-wrap gap-4">
        {suggestedClasses.length > 0 ? (
          suggestedClasses.map((item) => (
            <ClassItem 
              key={item.id} 
              classInfo={item}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : searchText === '' ? (
          <p className="text-gray-500">Try to type the class name to see suggested options</p>
        ) : (
          <p className="text-gray-500">No matching classes found.</p>
        )}
      </div>
    </div>
  );
}