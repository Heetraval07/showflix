import { useTrending } from '../../hooks/useContentData';
import ContentCard from '../common/ContentCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';
import { useWatchlist } from '../../hooks/useWatchlist';
import './TrendingSection.css';

const TrendingSection = () => {
  const { data, loading, error } = useTrending();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const handleWatchlistToggle = (item) => {
    const inList = isInWatchlist(item.id, item.type);
    if (inList) {
      removeFromWatchlist(item.id, item.type);
    } else {
      addToWatchlist(item);
    }
  };

  if (loading) {
    return (
      <section className="trending-section">
        <div className="trending-section__header">
          <h2 className="trending-section__title">Trending Today</h2>
        </div>
        <div className="trending-section__grid">
          <LoadingSkeleton type="trending" count={5} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="trending-section">
        <div className="trending-section__header">
          <h2 className="trending-section__title">Trending Today</h2>
        </div>
        <EmptyState
          icon="⚠️"
          title="Unable to load trending content"
          message={error}
        />
      </section>
    );
  }

  const trendingItems = Array.isArray(data) ? data : (data?.results || []);

  if (!trendingItems || trendingItems.length === 0) {
    return (
      <section className="trending-section">
        <div className="trending-section__header">
          <h2 className="trending-section__title">Trending Today</h2>
        </div>
        <EmptyState
          icon="📊"
          title="No trending content"
          message="Check back later for trending movies and series!"
        />
      </section>
    );
  }

  return (
    <section className="trending-section">
      <div className="trending-section__header">
        <h2 className="trending-section__title">Trending Today</h2>
        <p className="trending-section__subtitle">
          Discover what's popular right now
        </p>
      </div>
      <div className="trending-section__grid">
        {trendingItems.slice(0, 10).map((item) => {
          const itemId = item.id || item._id;
          const itemType = item.type || (item.media_type === 'movie' ? 'movie' : 'tvshow');
          return (
            <ContentCard
              key={`${itemType}-${itemId}`}
              item={item}
              onWatchlistToggle={handleWatchlistToggle}
              isInWatchlist={isInWatchlist(itemId, itemType)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TrendingSection;

