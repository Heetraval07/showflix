import { APP_CONFIG } from '../config/constants';

export const watchlistManager = {
  get: () => {
    try {
      const stored = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.WATCHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  add: (item) => {
    try {
      const watchlist = watchlistManager.get();
      const exists = watchlist.some(
        (w) => w.id === item.id && w.type === item.type
      );
      
      if (!exists) {
        const updated = [...watchlist, { ...item, addedAt: Date.now() }];
        localStorage.setItem(
          APP_CONFIG.STORAGE_KEYS.WATCHLIST,
          JSON.stringify(updated)
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  remove: (id, type) => {
    try {
      const watchlist = watchlistManager.get();
      const updated = watchlist.filter(
        (w) => !(w.id === id && w.type === type)
      );
      localStorage.setItem(
        APP_CONFIG.STORAGE_KEYS.WATCHLIST,
        JSON.stringify(updated)
      );
      return true;
    } catch {
      return false;
    }
  },

  isInWatchlist: (id, type) => {
    const watchlist = watchlistManager.get();
    return watchlist.some((w) => w.id === id && w.type === type);
  },

  clear: () => {
    try {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.WATCHLIST);
      return true;
    } catch {
      return false;
    }
  }
};

