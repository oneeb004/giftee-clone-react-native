import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

export const getQueryFromObject = (obj: Record<string, any>) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      const k = encodeURIComponent(String(key));
      const v = encodeURIComponent(String(value));
      return `${k}=${v}`;
    })
    .join('&');
};

const notify = {
  error: (message: string, position: 'top' | 'bottom' = 'bottom') => {
    Toast.show({
      type: 'error',
      text1: message,
      position,
    });
  },

  success: (message: string, position: 'top' | 'bottom' = 'bottom') => {
    Toast.show({
      type: 'success',
      text1: message,
      position,
    });
  },
};

export default notify;


export const useDebouncedSearch = (
  callback: (search: string) => any,
  delay: number = 300
) => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  useEffect(() => {
    callback(debouncedSearch);
  }, [debouncedSearch, callback]);

  return {
    search,
    setSearch,
  };
};
