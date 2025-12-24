import { useWatchlist } from '../hooks/useWatchlist';
import ContentGrid from '../components/common/ContentGrid';
import EmptyState from '../components/common/EmptyState';
import './WatchlistPage.css';

const WatchlistPage = () => {
  const { watchlist, isLoading, removeFromWatchlist, isInWatchlist, clearWatchlist } = useWatchlist();

  const handleWatchlistToggle = (item) => {
    removeFromWatchlist(item.id, item.type);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
    }
  };

  if (isLoading) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-page__container">
          <div className="watchlist-page__header">
            <h1 className="watchlist-page__title">My Watchlist</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-page__container">
        <div className="watchlist-page__header">
          <div>
            <h1 className="watchlist-page__title">My Watchlist</h1>
            <p className="watchlist-page__subtitle">
              {watchlist.length === 0 
                ? 'Your saved content will appear here'
                : `${watchlist.length} item${watchlist.length !== 1 ? 's' : ''} saved`}
            </p>
          </div>
          {watchlist.length > 0 && (
            <button
              className="watchlist-page__clear-btn"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          )}
        </div>

        {watchlist.length === 0 ? (
          <EmptyState
            icon="📋"
            title="Your watchlist is empty"
            message="Start adding movies and TV shows to your watchlist to keep track of what you want to watch!"
            actionLabel="Browse Content"
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <ContentGrid
            items={watchlist}
            loading={false}
            onWatchlistToggle={handleWatchlistToggle}
            isInWatchlist={isInWatchlist}
          />
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;

