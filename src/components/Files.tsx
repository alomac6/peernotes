type File = {
    id: number;
    name: string;
    description: string;
}

function FileItem({ name, description }: { name: string; description: string }) {
  return (
    <div 
      className="flex flex-col justify-center text-center p-4 border-2 border-black rounded-lg bg-white"
      style={{ width: '15vw', height: '15vh' }}
    >
      <span className="font-bold text-lg">{name}</span>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}

export default function Files({ files }: { files: File[] }) {
  return (
    <div className="w-full mt-8">
      <div className="flex flex-wrap justify-start gap-11">
        {files.length > 0 ? (
            files.map((file) => (
                <FileItem key={file.id} name={file.name} description={file.description} />
            ))
        ) : (
            <p className="text-gray-500">No files found matching your search.</p>
        )}
      </div>
    </div>
  );
}