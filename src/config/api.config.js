export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  ENDPOINTS: {
    MOVIES: {
      LIST: '/movie/popular',
      SEARCH: '/search/movie',
      DETAILS: (id) => `/movie/${id}`,
      CAST: (id) => `/movie/${id}/credits`
    },
    TV_SHOWS: {
      LIST: '/tv/popular',
      SEARCH: '/search/tv',
      DETAILS: (id) => `/tv/${id}`,
      CAST: (id) => `/tv/${id}/credits`
    },
    TRENDING: '/trending/all/day'
  },
  DEFAULT_PAGE: 1,
  ITEMS_PER_PAGE: 20
};

export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

