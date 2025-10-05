import { Star } from 'lucide-react';

export type ClassInfo = {
  id: number;
  department: string;
  code: string;
  name: string;
};

type ClassItemProps = {
  classInfo: ClassInfo;
  isFavorite: boolean;
  onToggleFavorite: (classInfo: ClassInfo) => void;
};

export function ClassItem({ classInfo, isFavorite, onToggleFavorite }: ClassItemProps) {
  const { department, code, name } = classInfo;

  return (
    <div
      className="flex items-center justify-between text-center p-2 border-2 border-black rounded-md text-black bg-gray-100 hover:border-orange-500"
      style={{ width: '15vw', height: '10vh' }}
    >
      <div className="flex flex-col items-center flex-grow">
        <span className="font-bold text-lg">{department}-{code}</span>
        <span className="text-md">{name}</span>
      </div>
      <Star
        className={`cursor-pointer transition-colors ${
          isFavorite ? 'text-orange-500 fill-orange-500' : 'text-gray-400 fill-none'
        }`}
        onClick={() => onToggleFavorite(classInfo)}
      />
    </div>
  );
}

