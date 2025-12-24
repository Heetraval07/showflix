# ShowFlix

**Discover movies & series you'll love**

ShowFlix is a modern, responsive entertainment discovery application built with React. It provides users with an intuitive interface to explore movies and TV shows, discover trending content, manage personal watchlists, and find their next favorite series or film.

## 🎯 Features

### Core Functionality
- **Trending Today Section**: Real-time display of currently popular movies and TV shows
- **Global Search**: Debounced search functionality across movies and TV series
- **Content Discovery**: Browse extensive collections of movies and TV shows
- **Detailed Views**: Comprehensive information pages with cast details and metadata
- **Watchlist Management**: Save content to a personal watchlist using localStorage
- **Advanced Filtering**: Filter by genre, rating, and content type
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience Enhancements
- **Loading Skeletons**: Smooth loading states for better perceived performance
- **Empty States**: Helpful messages when no content is available
- **Error Handling**: Graceful error handling with user-friendly messages
- **Performance Optimized**: Efficient API calls and state management

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router v6**: Client-side routing and navigation
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests

### Architecture & Patterns
- **Custom Hooks**: Reusable logic for data fetching, search, filters, and watchlist
- **Component Composition**: Modular, reusable UI components
- **Centralized Configuration**: API endpoints and constants management
- **Local Storage**: Persistent watchlist storage

## 📁 Project Structure

```
showflix/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── ContentCard.jsx
│   │   │   ├── ContentGrid.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── filters/         # Filter components
│   │   │   └── FilterBar.jsx
│   │   ├── layout/          # Layout components
│   │   │   └── Header.jsx
│   │   └── sections/        # Page sections
│   │       └── TrendingSection.jsx
│   ├── config/              # Configuration files
│   │   ├── api.config.js    # API endpoints
│   │   └── constants.js     # App constants
│   ├── hooks/               # Custom React hooks
│   │   ├── useContentData.js
│   │   ├── useSearch.js
│   │   ├── useWatchlist.js
│   │   └── useFilters.js
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── ContentDetailsPage.jsx
│   │   └── WatchlistPage.jsx
│   ├── utils/               # Utility functions
│   │   ├── api.client.js
│   │   ├── watchlist.manager.js
│   │   └── debounce.js
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd showflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary Background**: Deep navy (`#0a0e27`)
- **Secondary Background**: Dark blue (`#16213e`)
- **Card Background**: Dark purple (`#1a1a2e`)
- **Accent Colors**: Purple gradient (`#667eea` to `#764ba2`)
- **Success**: Green (`#10b981`)
- **Warning**: Amber (`#fbbf24`)

### Typography
- **Primary Font**: System font stack (San Francisco, Segoe UI, etc.)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400-500)

## 🔧 Key Features Implementation

### Custom Hooks

#### `useContentData`
Handles data fetching with loading and error states. Supports movies, TV shows, trending content, and details.

#### `useSearch`
Implements debounced search with configurable content type filtering.

#### `useWatchlist`
Manages watchlist state with localStorage persistence and real-time updates.

#### `useFilters`
Provides filtering logic for genre, rating, and content type with reset functionality.

### API Integration

The application integrates with a RESTful API for content data. API configuration is centralized in `src/config/api.config.js` for easy maintenance and updates.

### Performance Optimizations

- **Debounced Search**: Reduces API calls during typing
- **Lazy Loading**: Images load on demand
- **Memoization**: Prevents unnecessary re-renders
- **Efficient State Management**: Local state with minimal prop drilling

## 📱 Responsive Design

ShowFlix is fully responsive with breakpoints optimized for:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

Grid layouts automatically adjust column counts based on screen size.

## 🧪 Testing Considerations

While this project focuses on implementation, the architecture supports easy testing:
- Components are isolated and testable
- Hooks can be tested independently
- Utility functions are pure and predictable
- API client is mockable

## 📚 Learning Outcomes

This project demonstrates:

1. **Modern React Patterns**: Hooks, functional components, and composition
2. **State Management**: Custom hooks for complex state logic
3. **API Integration**: Centralized configuration and error handling
4. **Performance**: Debouncing, lazy loading, and optimization techniques
5. **User Experience**: Loading states, empty states, and error handling
6. **Responsive Design**: Mobile-first approach with flexible layouts
7. **Code Organization**: Modular structure and separation of concerns

## 🔮 Future Enhancements

Potential improvements for future iterations:
- User authentication and personalized recommendations
- Advanced filtering options (year, runtime, etc.)
- Content reviews and ratings
- Social features (sharing, comments)
- Dark/light theme toggle
- Accessibility improvements (ARIA labels, keyboard navigation)
- Unit and integration tests
- Progressive Web App (PWA) capabilities

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

Built as a portfolio project demonstrating modern React development practices and user-centric design.

---

**ShowFlix** - Your gateway to discovering amazing entertainment content 🎬✨
