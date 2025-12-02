'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function loadLocalFavorites() {
      try {
        const raw = window.localStorage.getItem('favorites');
        const parsed = raw ? JSON.parse(raw) : [];
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error('Read favorites failed:', err);
        setFavorites([]);
      }
    }

    loadLocalFavorites();

    const listener = (event) => {
      if (event.key === 'favorites') loadLocalFavorites();
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  return (
    <main className="page my-page">
      <header className="top-nav">
        <div className="logo">Movies</div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/movies" className="nav-link">
            Browse
          </Link>
          <Link href="/my" className="nav-link active">
            My Stuff
          </Link>
        </nav>
      </header>

      <section className="my-content">
        <h1>My Movies</h1>
        {favorites.length === 0 && <p>You haven't saved any movies yet.</p>}

        <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
          {favorites.map((f) => (
            <div
              key={f.tmdb_id ?? f.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                background: '#181818',
                padding: '10px',
                borderRadius: '6px',
              }}
            >
              {f.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${f.poster_path}`}
                  alt={f.title}
                  style={{ borderRadius: '4px' }}
                />
              )}
              <div>
                <div style={{ fontWeight: 600 }}>{f.title}</div>
                {f.rating && (
                  <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>
                    Rating: {f.rating}/5
                  </div>
                )}
                {f.comment && (
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    "{f.comment}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
