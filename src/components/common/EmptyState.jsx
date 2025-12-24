import './EmptyState.css';

const EmptyState = ({ 
  icon = '🎬', 
  title = 'Nothing here yet', 
  message = 'Start exploring to discover amazing content!',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-state__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

