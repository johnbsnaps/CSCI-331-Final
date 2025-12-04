'use client';

import { useEffect, useState } from 'react';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '2806c5d20041a0ea55284ddc2847ebca';


//Got this from StackOverflow
export default function Movies() {
  const [query, setQuery] = useState('avengers');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchMovies(q) {
    if (!q.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      //Unique API_KEY
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        q
      )}&page=1&include_adult=false`;

      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error('TMDB search error:', res.status, res.statusText, text);
        throw new Error(`TMDB error ${res.status}`);
      }

      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    searchMovies(query);
  }, []);

  function saveFavorite(movie) {
    const ratingInput = window.prompt(
      `Rate "${movie.title}" from 1-5 (optional):`,
      '5'
    );
    if (ratingInput === null) return; // cancel should fully abort

    const comment = window.prompt(
      `Add a short comment for "${movie.title}" (optional):`,
      ''
    );
    if (comment === null) return; // cancel should fully abort

    const trimmedRating = ratingInput.trim();
    const parsedRating =
      trimmedRating === '' ? null : Number.parseFloat(trimmedRating);
    if (trimmedRating !== '' && !Number.isFinite(parsedRating)) {
      alert('Invalid rating. Save canceled.');
      return;
    }
    const rating = Number.isFinite(parsedRating) ? parsedRating : null;

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

  function handleSubmit(e) {
    e.preventDefault();
    searchMovies(query);
  }

  //Base Page
  return (
    <div className="browse-page">
      <h1>Browse Movies</h1>
      <p>Search for a movie title using TMDB.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button
          type="submit"
          className="hero-button hero-button-primary"
          style={{ marginLeft: '8px' }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <table className="movies-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Poster</th>
              <th>Release Date</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr
                key={m.id}
                onClick={() => saveFavorite(m)}
                style={{ cursor: 'pointer' }}
              >
                <td>{m.title}</td>
                <td>
                  {m.poster_path && (
                    <img
                      src={`${IMAGE_BASE}${m.poster_path}`}
                      alt={m.title}
                      className="table-image"
                    />
                  )}
                </td>
                <td>{m.release_date}</td>
                <td>{m.vote_average?.toFixed(1)}</td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveFavorite(m);
                    }}
                    style={{ padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && movies.length === 0 && (
        <p style={{ marginTop: '16px' }}>No results. Try another title.</p>
      )}

      <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}
