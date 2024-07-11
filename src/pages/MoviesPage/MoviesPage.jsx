import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1ZmY0M2QyZTBkZTdmM2NiMmQ3OGJmYWVlYWQ1NyIsIm5iZiI6MTcyMDU5ODU5Ny41Njc5NTQsInN1YiI6IjY2OGUzZjMzNDg3MWQyMWUwZTVjMmE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRHCUBj7kXhEVY3elzw-_eK9CTccID0o8waljMQ3zZo';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    axios
      .get(API_URL, {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError('No movies found');
        } else {
          setMovies(response.data.results);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}
