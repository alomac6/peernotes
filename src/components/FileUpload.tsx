import { useState, type FormEvent, type ChangeEvent } from 'react';
import { UploadCloud, X, File as FileIcon } from 'lucide-react';

type FileUploadProps = {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (status: 'success' | 'fail') => void;
  courseName: string;
};

export default function FileUpload({ isOpen, onClose, onUploadComplete, courseName }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const payload = {
      description: description,
      filename: selectedFile.name,
      courseName: courseName,
    };

    const uploadUrl = `https://jayson-willowy-deceivingly.ngrok-free.dev/class/${courseName}`;

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        onUploadComplete('success');
      } else {
        const errorText = await response.text();
        console.error('Upload failed with status:', response.status, 'and message:', errorText);
        onUploadComplete('fail');
      }
    } catch (error) {
      console.error('Upload request failed:', error);
      onUploadComplete('fail');
    }

    onClose();
    setSelectedFile(null);
    setDescription('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="relative bg-white text-black rounded-lg shadow-xl p-8 border-black border-1"
        style={{ width: '50vw', height: 'fit-content' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Upload a New File for {courseName.toUpperCase()}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="A brief description of the file's content."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {selectedFile ? (
                  <div className="flex flex-col items-center justify-center">
                      <FileIcon className="w-10 h-10 text-blue-500"/>
                      <p className="text-sm text-gray-700 mt-2">{selectedFile.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOCX, PNG, or JPEG</p>
                  </div>
                )}
                <input 
                  id="dropzone-file" 
                  type="file" 
                  className="hidden"
                  accept=".pdf,.docx,.png,.jpeg"
                  onChange={handleFileChange}
                />
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
}