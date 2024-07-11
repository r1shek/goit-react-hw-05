import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWY1ZmY0M2QyZTBkZTdmM2NiMmQ3OGJmYWVlYWQ1NyIsIm5iZiI6MTcyMDU5ODU5Ny41Njc5NTQsInN1YiI6IjY2OGUzZjMzNDg3MWQyMWUwZTVjMmE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HRHCUBj7kXhEVY3elzw-_eK9CTccID0o8waljMQ3zZo';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>We don't have any reviews for this film</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
