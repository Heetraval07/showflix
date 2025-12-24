import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentGrid from '../components/common/ContentGrid';
import FilterBar from '../components/filters/FilterBar';
import { useSearch } from '../hooks/useSearch';
import { useFilters } from '../hooks/useFilters';
import { useWatchlist } from '../hooks/useWatchlist';
import EmptyState from '../components/common/EmptyState';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [contentType, setContentType] = useState('all');
  
  const { results, loading, error } = useSearch(query, contentType);
  
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

  useEffect(() => {
    setContentTypeFilter(contentType);
  }, [contentType, setContentTypeFilter]);

  const handleWatchlistToggle = (item) => {
    const inList = isInWatchlist(item.id, item.type);
    if (inList) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  const filteredResults = applyFilters(results);

  return (
    <div className="search-page">
      <div className="search-page__container">
        {query && (
          <div className="search-page__header">
            <h1 className="search-page__title">
              Search Results for "{query}"
            </h1>
            <p className="search-page__count">
              {loading ? 'Searching...' : `${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
        )}

        {!query && (
          <EmptyState
            icon="🔍"
            title="Start your search"
            message="Enter a movie or TV show title in the search bar above to discover content."
          />
        )}

        {query && !loading && error && (
          <EmptyState
            icon="⚠️"
            title="Search failed"
            message={error}
          />
        )}

        {query && (
          <>
            <div className="search-page__filters">
              <div className="search-page__content-type">
                <label className="search-page__label">Search in:</label>
                <select
                  className="search-page__select"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="movie">Movies Only</option>
                  <option value="tvshow">TV Shows Only</option>
                </select>
              </div>
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
              items={filteredResults}
              loading={loading}
              onWatchlistToggle={handleWatchlistToggle}
              isInWatchlist={isInWatchlist}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

