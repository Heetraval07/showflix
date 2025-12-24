import { useState } from 'react';
import TrendingSection from '../components/sections/TrendingSection';
import ContentGrid from '../components/common/ContentGrid';
import FilterBar from '../components/filters/FilterBar';
import { useMovies, useTVShows } from '../hooks/useContentData';
import { useFilters } from '../hooks/useFilters';
import { useWatchlist } from '../hooks/useWatchlist';
import './HomePage.css';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contentType, setContentType] = useState('all');
  
  const { data: moviesData, loading: moviesLoading } = useMovies(currentPage);
  const { data: tvShowsData, loading: tvShowsLoading } = useTVShows(currentPage);
  
  const {
    genreFilter,
    ratingFilter,
    contentTypeFilter,
    setGenreFilter,
    setRatingFilter,
    setContentTypeFilter,
    applyFilters,
    resetFilters
  } = useFilters();

  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const handleWatchlistToggle = (item) => {
    const inList = isInWatchlist(item.id, item.type);
    if (inList) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  const allContent = [];
  if (moviesData) {
    const movies = Array.isArray(moviesData) ? moviesData : (moviesData.results || []);
    movies.forEach(movie => allContent.push({ ...movie, type: 'movie' }));
  }
  if (tvShowsData) {
    const tvShows = Array.isArray(tvShowsData) ? tvShowsData : (tvShowsData.results || []);
    tvShows.forEach(show => allContent.push({ ...show, type: 'tvshow' }));
  }

  const filteredContent = applyFilters(allContent);
  const isLoading = moviesLoading || tvShowsLoading;

  return (
    <div className="home-page">
      <TrendingSection />
      
      <div className="home-page__content">
        <div className="home-page__header">
          <h2 className="home-page__title">Browse All Content</h2>
          <p className="home-page__subtitle">
            Explore our collection of movies and TV series
          </p>
        </div>

        <FilterBar
          genreFilter={genreFilter}
          ratingFilter={ratingFilter}
          contentTypeFilter={contentTypeFilter}
          onGenreChange={setGenreFilter}
          onRatingChange={setRatingFilter}
          onContentTypeChange={setContentTypeFilter}
          onReset={resetFilters}
        />

        <ContentGrid
          items={filteredContent}
          loading={isLoading}
          onWatchlistToggle={handleWatchlistToggle}
          isInWatchlist={isInWatchlist}
        />
      </div>
    </div>
  );
};

export default HomePage;

