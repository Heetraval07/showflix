import './LoadingSkeleton.css';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div key={i} className={`skeleton skeleton--${type}`}>
      {type === 'card' && (
        <>
          <div className="skeleton__poster"></div>
          <div className="skeleton__content">
            <div className="skeleton__line skeleton__line--title"></div>
            <div className="skeleton__line skeleton__line--subtitle"></div>
          </div>
        </>
      )}
      {type === 'trending' && (
        <>
          <div className="skeleton__poster skeleton__poster--wide"></div>
          <div className="skeleton__content">
            <div className="skeleton__line skeleton__line--title"></div>
            <div className="skeleton__line skeleton__line--medium"></div>
            <div className="skeleton__line skeleton__line--short"></div>
          </div>
        </>
      )}
      {type === 'text' && (
        <div className="skeleton__content">
          <div className="skeleton__line"></div>
        </div>
      )}
    </div>
  ));

  return <>{skeletons}</>;
};

export default LoadingSkeleton;

