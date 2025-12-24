import ContentCard from './ContentCard';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { SKELETON_COUNT } from '../../config/constants';
import './ContentGrid.css';

const ContentGrid = ({ 
  items = [], 
  loading = false, 
  onWatchlistToggle,
  isInWatchlist 
}) => {
  if (loading) {
    return (
      <div className="content-grid">
        <LoadingSkeleton type="card" count={SKELETON_COUNT.CARDS} />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No content found"
        message="Try adjusting your filters or check back later for new releases."
      />
    );
  }

  return (
    <div className="content-grid">
      {items.map((item) => {
        const itemId = item.id || item._id;
        const itemType = item.type || (item.media_type === 'movie' ? 'movie' : 'tvshow');
        return (
          <ContentCard
            key={`${itemType}-${itemId}`}
            item={item}
            onWatchlistToggle={onWatchlistToggle}
            isInWatchlist={isInWatchlist ? isInWatchlist(itemId, itemType) : false}
          />
        );
      })}
    </div>
  );
};

export default ContentGrid;

