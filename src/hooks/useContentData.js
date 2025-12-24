import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api.client';
import { API_CONFIG } from '../config/api.config';

export const useContentData = (endpoint, params = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      const result = await fetchData(endpoint, params);

      if (isMounted) {
        if (result.error) {
          setError(result.error);
          setData(null);
        } else {
          setData(result.data);
          setError(null);
        }
        setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
};

export const useMovies = (page = API_CONFIG.DEFAULT_PAGE) => {
  return useContentData(API_CONFIG.ENDPOINTS.MOVIES.LIST, { page }, [page]);
};

export const useTVShows = (page = API_CONFIG.DEFAULT_PAGE) => {
  return useContentData(API_CONFIG.ENDPOINTS.TV_SHOWS.LIST, { page }, [page]);
};

export const useTrending = () => {
  return useContentData(API_CONFIG.ENDPOINTS.TRENDING, { page: 1 });
};

export const useContentDetails = (id, type) => {
  const endpoint = type === 'movie' 
    ? API_CONFIG.ENDPOINTS.MOVIES.DETAILS(id)
    : API_CONFIG.ENDPOINTS.TV_SHOWS.DETAILS(id);
  
  return useContentData(endpoint, {}, [id, type]);
};

export const useContentCast = (id, type) => {
  const endpoint = type === 'movie'
    ? API_CONFIG.ENDPOINTS.MOVIES.CAST(id)
    : API_CONFIG.ENDPOINTS.TV_SHOWS.CAST(id);
  
  const { data, loading, error } = useContentData(endpoint, {}, [id, type]);
  const castArray = data?.cast || data || [];

  return { data: castArray, loading, error };
};

