import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1ZmY0M2QyZTBkZTdmM2NiMmQ3OGJmYWVlYWQ1NyIsIm5iZiI6MTcyMDU5ODU5Ny41Njc5NTQsInN1YiI6IjY2OGUzZjMzNDg3MWQyMWUwZTVjMmE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRHCUBj7kXhEVY3elzw-_eK9CTccID0o8waljMQ3zZo';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      })
      .catch((error) => console.error(error));
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${actor.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
