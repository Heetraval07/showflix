import { useState, useEffect } from 'react';
import { fetchData } from '../utils/api.client';
import { API_CONFIG } from '../config/api.config';
import { useDebounce } from '../utils/debounce';
import { DEBOUNCE_DELAY } from '../config/constants';

export const useSearch = (query, contentType = 'all') => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const performSearch = async () => {
      setLoading(true);
      setError(null);

      const searchPromises = [];

      if (contentType === 'all' || contentType === 'movie') {
        searchPromises.push(
          fetchData(API_CONFIG.ENDPOINTS.MOVIES.SEARCH, {
            query: debouncedQuery
          })
        );
      }

      if (contentType === 'all' || contentType === 'tvshow') {
        searchPromises.push(
          fetchData(API_CONFIG.ENDPOINTS.TV_SHOWS.SEARCH, {
            query: debouncedQuery
          })
        );
      }

      try {
        const responses = await Promise.all(searchPromises);
        const allResults = [];

        responses.forEach((response, index) => {
          if (response.data) {
            const type = index === 0 && contentType !== 'tvshow' ? 'movie' : 'tvshow';
            const items = Array.isArray(response.data)
              ? response.data
              : response.data.results || [];
            items.forEach(item => {
              allResults.push({ ...item, type });
            });
          }
        });

        if (isMounted) {
          setResults(allResults);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Search failed');
          setResults([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery, contentType]);

  return { results, loading, error };
};

