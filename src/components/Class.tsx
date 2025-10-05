import { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import Searchbar from './Searchbar.tsx';
import Files from './Files.tsx';

const files_map = [
    {id: 1, name: "Syllabus.pdf", description: "Fall 2025 Syllabus"},
    {id: 2, name: "Lecture1.pptx", description: "Introduction to Algorithms"},
    {id: 3, name: "Homework1.docx", description: "First homework assignment"},
    {id: 4, name: "Exam1_Review.pdf", description: "Review sheet for the first exam"},
];

export default function Class() {
  const [searchText, setSearchText] = useState('');

  const filteredFiles = useMemo(() => {
    if (!searchText) {
      return files_map; // Show all files if search is empty
    }
    return files_map.filter(file => 
      file.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <main className='w-[70vw] min-h-[80vh] m-auto flex flex-col items-center pt-8'>
      <div className="w-full flex items-center justify-center gap-[5vw]">
        <div className="w-[65vw]">
          <Searchbar onSearchChange={setSearchText} />
        </div>
        <div className="w-[10vw] flex items-center justify-center">
            <button className="flex items-center gap-2 text-lg font-semibold text-black hover:text-blue-600 transition-colors">
                <span>Upload</span>
                <PlusCircle size={24} />
            </button>
        </div>
      </div>

      <Files files={filteredFiles} />
    </main>
  );
}