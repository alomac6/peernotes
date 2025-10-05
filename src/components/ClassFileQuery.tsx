import { useQuery } from '@tanstack/react-query';

const fetchClassFiles = async (classCode: string | undefined) => {
  if (!classCode) {
    return [];
  }
  const response = await fetch(`https://jayson-willowy-deceivingly.ngrok-free.dev/class/${classCode}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useClassFilesQuery(classCode: string | undefined) {
  return useQuery({
    queryKey: ['classFiles', classCode],
    queryFn: () => fetchClassFiles(classCode),
    enabled: !!classCode,
  });
}