import { GENRES, RATING_FILTERS, RATING_FILTER_CONFIG } from '../../config/constants';
import './FilterBar.css';

const FilterBar = ({
  genreFilter,
  ratingFilter,
  contentTypeFilter,
  onGenreChange,
  onRatingChange,
  onContentTypeChange,
  onReset
}) => {
  const genreOptions = Object.values(GENRES);
  const ratingOptions = [
    { value: RATING_FILTERS.ALL, label: 'All Ratings' },
    { value: RATING_FILTERS.HIGH, label: RATING_FILTER_CONFIG[RATING_FILTERS.HIGH].label },
    { value: RATING_FILTERS.MEDIUM, label: RATING_FILTER_CONFIG[RATING_FILTERS.MEDIUM].label },
    { value: RATING_FILTERS.LOW, label: RATING_FILTER_CONFIG[RATING_FILTERS.LOW].label }
  ];

  const hasActiveFilters = 
    genreFilter !== GENRES.ALL || 
    ratingFilter !== RATING_FILTERS.ALL || 
    contentTypeFilter !== 'all';

  return (
    <div className="filter-bar">
      <div className="filter-bar__group">
        <label className="filter-bar__label">Content Type</label>
        <select
          className="filter-bar__select"
          value={contentTypeFilter}
          onChange={(e) => onContentTypeChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tvshow">TV Shows</option>
        </select>
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label">Genre</label>
        <select
          className="filter-bar__select"
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__group">
        <label className="filter-bar__label">Rating</label>
        <select
          className="filter-bar__select"
          value={ratingFilter}
          onChange={(e) => onRatingChange(e.target.value)}
        >
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button className="filter-bar__reset" onClick={onReset}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;

