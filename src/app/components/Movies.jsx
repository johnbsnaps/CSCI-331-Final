'use client';

import { useEffect, useState } from 'react';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w200';
const API_KEY = '2806c5d20041a0ea55284ddc2847ebca';

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
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        q
      )}&page=1&include_adult=false`;
      console.log('Searching:', url);

      const res = await fetch(url);

      if (!res.ok) {
        const text = await res.text();
        console.error('TMDB search error:', res.status, res.statusText, text);
        throw new Error(`TMDB error ${res.status}`);
      }

      const data = await res.json();
      console.log('Search data:', data);
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

  function handleSubmit(e) {
    e.preventDefault();
    searchMovies(query);
  }

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
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
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