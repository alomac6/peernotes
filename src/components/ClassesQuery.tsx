import { useQuery } from '@tanstack/react-query'

const fetchAllClasses = async () => {
  const response = await fetch('http://localhost:3001/courses');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useClassesQuery() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllClasses,
  });
}