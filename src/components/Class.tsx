import { useState, useMemo, useEffect } from 'react';
import { PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useParams } from '@tanstack/react-router';
import Searchbar from './Searchbar.tsx';
import Files from './Files.tsx';
import FileUpload from './FileUpload.tsx';
import { useClassesQuery } from './ClassesQuery.tsx';
import { useClassFilesQuery } from './ClassFileQuery.tsx';

type UploadStatus = 'idle' | 'success' | 'fail';

type ApiCourse = {
  department: string;
  code: string;
  course_name: string;
};

type ApiFile = {
  id: number;
  filename: string;
  description: string;
};

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

export default function Class() {
  const { classCode } = useParams({ from: '/class/$classCode' });
  const { data: apiCoursesData } = useClassesQuery();
  const { data: apiFilesData, isLoading: areFilesLoading, error: filesError } = useClassFilesQuery(classCode);

  const className = useMemo(() => {
    if (!apiCoursesData || !classCode) return '';
    const [dept, code] = classCode.toUpperCase().split('-');
    const currentClass = (apiCoursesData as ApiCourse[]).find(c => c.department === dept && c.code === code);
    return currentClass ? currentClass.course_name : '';
  }, [apiCoursesData, classCode]);

  const allFiles = useMemo(() => {
    if (!apiFilesData) return [];
    return (apiFilesData as ApiFile[]).map(file => ({
      id: file.id,
      name: file.filename,
      description: file.description,
    }));
  }, [apiFilesData]);

  const [searchText, setSearchText] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');

  useEffect(() => {
    if (uploadStatus !== 'idle') {
      const timer = setTimeout(() => setUploadStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  const filteredFiles = useMemo(() => {
    if (!searchText) return allFiles;
    return allFiles.filter(file => 
      file.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, allFiles]);

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
        
        {areFilesLoading && <p className="mt-8 text-gray-500">Loading files...</p>}
        {filesError && <p className="mt-8 text-red-500">Could not fetch files for this class.</p>}
        {!areFilesLoading && !filesError && <Files files={filteredFiles} />}
      </main>

      <FileUpload 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={setUploadStatus}
        classCode={classCode}
        className={className}
      />
      <Toast status={uploadStatus} />
    </>
  );
}

