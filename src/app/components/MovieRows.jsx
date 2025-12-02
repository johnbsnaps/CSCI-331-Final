'use client';

import { useEffect, useState } from 'react';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
// Hard-coded for now so we know it's working
const API_KEY = '2806c5d20041a0ea55284ddc2847ebca';

export default function MovieRows() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        const res = await fetch(url);

        if (!res.ok) {
          const text = await res.text();
          console.error('TMDB error:', res.status, res.statusText, text);
          throw new Error(`TMDB error ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error('Load movies failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) return <p className="rows-message">Loading movies...</p>;
  if (error) return <p className="rows-message error">{error}</p>;
  if (!movies.length) return <p className="rows-message">No movies found.</p>;

  const firstRow = movies.slice(0, 10);
  const secondRow = movies.slice(10, 20);

  function handleSave(movie) {
    const ratingInput = window.prompt(
      `Rate "${movie.title}" from 1-5 (optional):`,
      '5'
    );
    const rating = ratingInput ? Number(ratingInput) : null;
    const comment = window.prompt(
      `Add a short comment for "${movie.title}" (optional):`,
      ''
    );

    const favorite = {
      tmdb_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    };

    if (Number.isFinite(rating)) favorite.rating = rating;
    if (comment) favorite.comment = comment;

    try {
      const raw = window.localStorage.getItem('favorites');
      const existing = raw ? JSON.parse(raw) : [];
      const withoutDupes = existing.filter(
        (f) => f.tmdb_id !== favorite.tmdb_id
      );
      const updated = [favorite, ...withoutDupes];
      window.localStorage.setItem('favorites', JSON.stringify(updated));
      alert(comment ? 'Saved with your rating and comment!' : 'Saved!');
    } catch (err) {
      console.error('Local save error:', err);
      alert('Could not save locally. Check storage permissions.');
    }
  }

  return (
    <div className="rows-wrapper">
      <MovieRow title="Trending Now" items={firstRow} onSave={handleSave} />
      <MovieRow title="Top Picks for You" items={secondRow} onSave={handleSave} />
    </div>
  );
}

function MovieRow({ title, items, onSave }) {
  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-scroll">
        {items.map((movie) => (
          <button
            type="button"
            className="row-card"
            key={movie.id}
            onClick={() => onSave(movie)}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="row-card-image"
              />
            ) : (
              <div className="row-card-image" />
            )}
            <div className="row-card-title">{movie.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
