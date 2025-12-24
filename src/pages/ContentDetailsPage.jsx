import { useParams } from 'react-router-dom';
import { useContentDetails, useContentCast } from '../hooks/useContentData';
import { useWatchlist } from '../hooks/useWatchlist';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import EmptyState from '../components/common/EmptyState';
import './ContentDetailsPage.css';

const ContentDetailsPage = () => {
  const { type, id } = useParams();
  const { data, loading, error } = useContentDetails(id, type);
  const { data: castData } = useContentCast(id, type);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (!data) return;
    
    const item = {
      id: data.id || data._id,
      type: type,
      title: data.title || data.name,
      poster: data.poster || data.poster_path || data.posterURL,
      rating: data.rating || data.vote_average
    };

    const inList = isInWatchlist(item.id, item.type);
    if (inList) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  if (loading) {
    return (
      <div className="content-details-page">
        <div className="content-details-page__skeleton">
          <LoadingSkeleton type="text" count={10} />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="content-details-page">
        <EmptyState
          icon="⚠️"
          title="Content not found"
          message={error || 'The content you\'re looking for doesn\'t exist.'}
        />
      </div>
    );
  }

  const title = data.title || data.name || 'Untitled';
  const overview = data.overview || data.description || 'No description available.';
  const rawPoster = data.poster || data.poster_path || data.posterURL || '';
  const rating = data.rating || data.vote_average || 0;
  const releaseDate = data.release_date || data.first_air_date || '';
  const genres = data.genres || [];
  const cast = Array.isArray(castData) ? castData.slice(0, 10) : [];
  const inWatchlist = isInWatchlist(data.id || data._id, type);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatRating = (rating) => {
    return rating > 0 ? rating.toFixed(1) : 'N/A';
  };

  const getPosterUrl = () => {
    if (!rawPoster) return '';
    if (rawPoster.startsWith('http')) return rawPoster;
    return `https://image.tmdb.org/t/p/w500${rawPoster}`;
  };

  const poster = getPosterUrl();

  return (
    <div className="content-details-page">
      <div className="content-details-page__container">
        <div className="content-details-page__hero">
          {poster && (
            <div className="content-details-page__poster">
              <img src={poster} alt={title} />
            </div>
          )}
          
          <div className="content-details-page__info">
            <h1 className="content-details-page__title">{title}</h1>
            
            <div className="content-details-page__meta">
              {releaseDate && (
                <span className="content-details-page__date">
                  {formatDate(releaseDate)}
                </span>
              )}
              {rating > 0 && (
                <span className="content-details-page__rating">
                  ⭐ {formatRating(rating)}
                </span>
              )}
            </div>

            {genres.length > 0 && (
              <div className="content-details-page__genres">
                {genres.map((genre, index) => (
                  <span key={index} className="content-details-page__genre">
                    {genre.name || genre}
                  </span>
                ))}
              </div>
            )}

            <p className="content-details-page__overview">{overview}</p>

            <button
              className={`content-details-page__watchlist-btn ${inWatchlist ? 'active' : ''}`}
              onClick={handleWatchlistToggle}
            >
              {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>

        {cast.length > 0 && (
          <div className="content-details-page__cast">
            <h2 className="content-details-page__cast-title">Cast</h2>
            <div className="content-details-page__cast-grid">
              {cast.map((actor, index) => (
                <div key={index} className="content-details-page__cast-member">
                  <div className="content-details-page__cast-name">
                    {actor.name || actor.character || 'Unknown'}
                  </div>
                  {actor.character && actor.name && (
                    <div className="content-details-page__cast-character">
                      as {actor.character}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetailsPage;

