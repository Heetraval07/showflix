import { useState, useEffect, useCallback } from 'react';
import { watchlistManager } from '../utils/watchlist.manager';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWatchlist = useCallback(() => {
    setIsLoading(true);
    const items = watchlistManager.get();
    setWatchlist(items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadWatchlist();

    const handleStorageChange = () => {
      loadWatchlist();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadWatchlist]);

  const addToWatchlist = useCallback((item) => {
    const success = watchlistManager.add(item);
    if (success) {
      loadWatchlist();
    }
    return success;
  }, [loadWatchlist]);

  const removeFromWatchlist = useCallback((id, type) => {
    const success = watchlistManager.remove(id, type);
    if (success) {
      loadWatchlist();
    }
    return success;
  }, [loadWatchlist]);

  const isInWatchlist = useCallback((id, type) => {
    return watchlistManager.isInWatchlist(id, type);
  }, []);

  const clearWatchlist = useCallback(() => {
    const success = watchlistManager.clear();
    if (success) {
      loadWatchlist();
    }
    return success;
  }, [loadWatchlist]);

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
    refresh: loadWatchlist
  };
};

