import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ContentDetailsPage from './pages/ContentDetailsPage';
import WatchlistPage from './pages/WatchlistPage';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/content/:type/:id" element={<ContentDetailsPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

