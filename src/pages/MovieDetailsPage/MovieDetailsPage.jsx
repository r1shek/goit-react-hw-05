import { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1ZmY0M2QyZTBkZTdmM2NiMmQ3OGJmYWVlYWQ1NyIsIm5iZiI6MTcyMDU5ODU5Ny41Njc5NTQsInN1YiI6IjY2OGUzZjMzNDg3MWQyMWUwZTVjMmE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRHCUBj7kXhEVY3elzw-_eK9CTccID0o8waljMQ3zZo';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  const goBack = () => {
    navigate(location.state?.from ?? '/movies');
  };

  return (
    <div>
      {movie && (
        <>
          <button onClick={goBack}>Go back</button>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.overview}</p>
          <ul>
            <li>
              <Link to="cast" state={{ from: location.state?.from }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: location.state?.from }}>
                Reviews
              </Link>
            </li>
          </ul>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </>
      )}
    </div>
  );
}
