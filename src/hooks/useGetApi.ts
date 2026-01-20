import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ApiService } from '../utils/api';

const useGetApi = <T>(
  url: string,
  config: {
    transformData?: (data: any) => T;
    withAuth?: boolean;
    initialData?: T;
  },
) => {
  const [data, setData] = useState<T | null>(config?.initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const token = 'Token';

  const fetchData = async () => {
    if (url === '') return;
    setLoading(true);
    const response = await ApiService.get<T>(
      url,
    //   config?.withAuth ? getAuthHeader(token) : undefined,
    );
    if (response.success && response.data) {
      setData(
        config?.transformData
          ? config?.transformData(response.data)
          : response.data,
      );
    }
    if (response.failed) {
      setError(response.error);
    }
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );
  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useGetApi;