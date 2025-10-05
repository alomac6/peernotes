import { useQuery } from '@tanstack/react-query'
const fetchAllClasses = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
};

export function useClassesQuery() {
  return useQuery({
    queryKey: ['Class'],
    queryFn: fetchAllClasses,
  });
}
