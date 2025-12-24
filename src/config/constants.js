export const APP_CONFIG = {
  NAME: 'ShowFlix',
  TAGLINE: 'Discover movies & series you\'ll love',
  STORAGE_KEYS: {
    WATCHLIST: 'showflix_watchlist',
    USER_TOKEN: 'showflix_token'
  }
};

export const CONTENT_TYPES = {
  MOVIE: 'movie',
  TV_SHOW: 'tvshow'
};

export const GENRES = {
  ALL: 'all',
  ACTION: 'Action',
  ADVENTURE: 'Adventure',
  ANIMATION: 'Animation',
  COMEDY: 'Comedy',
  CRIME: 'Crime',
  DOCUMENTARY: 'Documentary',
  DRAMA: 'Drama',
  FAMILY: 'Family',
  FANTASY: 'Fantasy',
  HISTORY: 'History',
  HORROR: 'Horror',
  MUSIC: 'Music',
  MYSTERY: 'Mystery',
  ROMANCE: 'Romance',
  SCIENCE_FICTION: 'Science Fiction',
  THRILLER: 'Thriller',
  WAR: 'War',
  WESTERN: 'Western'
};

export const RATING_FILTERS = {
  ALL: 'all',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

export const RATING_FILTER_CONFIG = {
  [RATING_FILTERS.HIGH]: { min: 7.5, label: '7.5+' },
  [RATING_FILTERS.MEDIUM]: { min: 6.0, max: 7.5, label: '6.0 - 7.5' },
  [RATING_FILTERS.LOW]: { max: 6.0, label: 'Below 6.0' }
};

export const DEBOUNCE_DELAY = 500;

export const SKELETON_COUNT = {
  CARDS: 8,
  TRENDING: 5
};

