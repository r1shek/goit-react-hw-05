import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const API_URL = 'https://api.themoviedb.org/3/trending/movie/day';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1ZmY0M2QyZTBkZTdmM2NiMmQ3OGJmYWVlYWQ1NyIsIm5iZiI6MTcyMDU5ODU5Ny41Njc5NTQsInN1YiI6IjY2OGUzZjMzNDg3MWQyMWUwZTVjMmE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRHCUBj7kXhEVY3elzw-_eK9CTccID0o8waljMQ3zZo';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
