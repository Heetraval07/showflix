# Entertainment App Database Schema Documentation

## Overview
This document outlines the database schemas used in the Entertainment App for managing movies, TV shows, and user data.

## Schemas

### Movie Schema
- **Purpose**: Defines the structure for storing movie data.
- **Collection**: Movies
- **Required Fields**:
    - `title` : String
    - `language` : String
    - `releaseDate` : Date
    - `summary` : String
    - `cast` : Array of Strings
- **Optional Fields**:
    - `imdbId` : String
    - `rating` : Number
    - `runtime` : Number
    - `status` : String
    - `genres` : Array of Strings
    - `homepage` : String
    - `bannerUrl` : String
    - `posterUrl` : String
    - `trailerUrl` : String

### TV Show Schema
- **Purpose**: Defines the structure for storing TV show data.
- **Collection**: TV Shows
- **Required Fields**:
    - `title` : String
    - `language` : String
    - `firstAirDate` : Date
    - `summary` : String
- **Optional Fields**:
    - `imdbId` : String
    - `rating` : Number
    - `rated` : String
    - `lastAirDate` : Date
    - `status` : String
    - `genres` : Array of Strings
    - `cast` : Array of Strings
    - `homepage` : String
    - `bannerUrl` : String
    - `posterUrl` : String

### User Schema
- **Purpose**: Manages user authentication and stores user-specific data.
- **Collection**: Users
- **Fields**:
    - `email` : String (required)
    - `password` : String (required)
    - `watchlist` : Array of ObjectIds (references Movies and TV Shows)
- **Features**:
    - `timestamps` : Automatically manages creation and update timestamps.

## Relationships
- **User to Movies/TV Shows**: A user can have multiple movies and TV shows in their watchlist, representing a one-to-many relationship.

## Model Creation
- **Function**: `mongoose.model()` is used to create models based on the defined schemas, which interact with the database.
