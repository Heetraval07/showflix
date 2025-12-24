import { Link } from 'react-router-dom';
import './ContentCard.css';

const ContentCard = ({ item, onWatchlistToggle, isInWatchlist }) => {
  const type = item.type || (item.media_type === 'movie' ? 'movie' : 'tvshow');
  const id = item.id || item._id;
  const title = item.title || item.name || 'Untitled';
  const rawPoster = item.poster || item.poster_path || item.posterURL || '';
  const rating = item.rating || item.vote_average || 0;
  const releaseDate = item.release_date || item.first_air_date || '';

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onWatchlistToggle) {
      onWatchlistToggle({ id, type, title, poster, rating });
    }
  };

  const formatRating = (rating) => {
    return rating > 0 ? rating.toFixed(1) : 'N/A';
  };

  const getYear = (date) => {
    return date ? new Date(date).getFullYear() : '';
  };

  const getPosterUrl = () => {
    if (!rawPoster) return '';
    if (rawPoster.startsWith('http')) return rawPoster;
    // TMDb image path
    return `https://image.tmdb.org/t/p/w500${rawPoster}`;
  };

  const poster = getPosterUrl();

  return (
    <Link to={`/content/${type}/${id}`} className="content-card">
      <div className="content-card__poster-wrapper">
        {poster ? (
          <img
            src={poster}
            alt={title}
            className="content-card__poster"
            loading="lazy"
          />
        ) : (
          <div className="content-card__poster-placeholder">
            <span>No Image</span>
          </div>
        )}
        <div className="content-card__overlay">
          <button
            className={`content-card__watchlist-btn ${isInWatchlist ? 'active' : ''}`}
            onClick={handleWatchlistClick}
            aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            {isInWatchlist ? '✓' : '+'}
          </button>
        </div>
        {rating > 0 && (
          <div className="content-card__rating">
            <span className="content-card__rating-value">{formatRating(rating)}</span>
          </div>
        )}
      </div>
      <div className="content-card__info">
        <h3 className="content-card__title">{title}</h3>
        {releaseDate && (
          <p className="content-card__year">{getYear(releaseDate)}</p>
        )}
      </div>
    </Link>
  );
};

export default ContentCard;

