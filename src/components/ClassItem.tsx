import { Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { MouseEvent } from 'react';

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
  const classCodeUrl = `${department.toLowerCase()}-${code}`;

  const handleToggleFavorite = (e: MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    onToggleFavorite(classInfo);
  };

  return (
    <Link
      to="/class/$classCode"
      params={{ classCode: classCodeUrl }}
      className="flex items-center justify-between text-center p-2 border-2 border-black rounded-md text-black bg-gray-100 no-underline hover:border-orange-500"
      style={{ width: '15vw', height: '10vh' }}
    >
      <div className="flex flex-col items-center flex-grow min-w-0">
        <span className="font-bold text-lg">{department}-{code}</span>
        <span className="text-md w-full truncate px-1">{name}</span>
      </div>
      <Star
        className={`cursor-pointer transition-colors z-10 ${
          isFavorite ? 'text-orange-500 fill-orange-500' : 'text-gray-400 fill-none'
        }`}
        onClick={handleToggleFavorite}
      />
    </Link>
  );
}