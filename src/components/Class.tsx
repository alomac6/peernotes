import { useState, useMemo, useEffect } from 'react';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import Searchbar from './Searchbar.tsx';
import Files from './Files.tsx';
import FileUpload from './FileUpload.tsx';

type UploadStatus = 'idle' | 'success' | 'fail';

function Toast({ status }: { status: UploadStatus }) {
  if (status === 'idle') return null;

  const isSuccess = status === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? CheckCircle : XCircle;
  const message = isSuccess ? 'File uploaded successfully!' : 'File upload failed.';

  return (
    <div className={`fixed bottom-5 right-5 flex items-center gap-4 p-4 rounded-lg text-white z-50 ${bgColor}`}>
      <Icon size={24} />
      <span>{message}</span>
    </div>
  );
}

const files_map = [
    {id: 1, name: "Syllabus.pdf", description: "Fall 2025 Syllabus"},
    {id: 2, name: "Lecture1.png", description: "Introduction to Algorithms"},
];

export default function Class() {
  const { classCode } = useParams({ from: '/class/$classCode' });
  const [searchText, setSearchText] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

  useEffect(() => {
    if (uploadStatus !== 'idle') {
      const timer = setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  const filteredFiles = useMemo(() => {
    if (!searchText) return files_map;
    return files_map.filter(file => 
      file.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  return (
    <>
      <main className='w-[70vw] min-h-[80vh] m-auto flex flex-col items-center pt-8'>
        <div className="w-full flex items-center justify-center gap-[5vw]">
          <div className="w-[65vw]">
            <Searchbar onSearchChange={setSearchText} />
          </div>
          <div className="w-[10vw] flex items-center justify-center">
              <button 
                className="flex items-center gap-2 text-lg font-semibold text-black hover:text-blue-600 transition-colors"
                onClick={() => setIsUploadModalOpen(true)}
              >
                  <span>Upload</span>
                  <PlusCircle size={24} />
              </button>
          </div>
        </div>

        <Files files={filteredFiles} />
      </main>

      <FileUpload 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={setUploadStatus}
        courseName={classCode}
      />
      <Toast status={uploadStatus} />
    </>
  );
}

