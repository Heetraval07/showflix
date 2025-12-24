import { useState, useMemo } from 'react';
import { GENRES, RATING_FILTERS, RATING_FILTER_CONFIG } from '../config/constants';

export const useFilters = () => {
  const [genreFilter, setGenreFilter] = useState(GENRES.ALL);
  const [ratingFilter, setRatingFilter] = useState(RATING_FILTERS.ALL);
  const [contentTypeFilter, setContentTypeFilter] = useState('all');

  const applyFilters = (items) => {
    if (!items || !Array.isArray(items)) return [];

    return items.filter((item) => {
      if (genreFilter !== GENRES.ALL) {
        const genres = item.genres || [];
        const genreNames = genres.map(g => g.name || g);
        if (!genreNames.includes(genreFilter)) {
          return false;
        }
      }

      if (ratingFilter !== RATING_FILTERS.ALL) {
        const rating = item.rating || item.vote_average || 0;
        const config = RATING_FILTER_CONFIG[ratingFilter];
        if (config) {
          if (ratingFilter === RATING_FILTERS.HIGH) {
            if (rating < config.min) return false;
          } else if (ratingFilter === RATING_FILTERS.MEDIUM) {
            if (rating < config.min || rating >= config.max) {
              return false;
            }
          } else if (ratingFilter === RATING_FILTERS.LOW) {
            if (rating >= config.max) return false;
          }
        }
      }

      if (contentTypeFilter !== 'all') {
        const itemType = item.type || (item.media_type === 'movie' ? 'movie' : 'tvshow');
        if (itemType !== contentTypeFilter) {
          return false;
        }
      }

      return true;
    });
  };

  const resetFilters = () => {
    setGenreFilter(GENRES.ALL);
    setRatingFilter(RATING_FILTERS.ALL);
    setContentTypeFilter('all');
  };

  const hasActiveFilters = useMemo(() => {
    return genreFilter !== GENRES.ALL || 
           ratingFilter !== RATING_FILTERS.ALL || 
           contentTypeFilter !== 'all';
  }, [genreFilter, ratingFilter, contentTypeFilter]);

  return {
    genreFilter,
    ratingFilter,
    contentTypeFilter,
    setGenreFilter,
    setRatingFilter,
    setContentTypeFilter,
    applyFilters,
    resetFilters,
    hasActiveFilters
  };
};

