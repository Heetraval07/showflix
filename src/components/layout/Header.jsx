import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../../config/constants';
import './Header.css';

const Header = ({ searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
      if (onSearchChange) {
        onSearchChange(localQuery.trim());
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🎬</span>
          <span className="header__logo-text">{APP_CONFIG.NAME}</span>
        </Link>

        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            Home
          </Link>
          <Link to="/watchlist" className="header__nav-link">
            My Watchlist
          </Link>
        </nav>

        <form className="header__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search movies & series..."
            value={localQuery}
            onChange={handleInputChange}
          />
          <button type="submit" className="header__search-btn" aria-label="Search">
            🔍
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;

