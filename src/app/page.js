import Link from 'next/link';
import MovieRows from './components/MovieRows';

export default function HomePage() {
  return (
    <main className="page">
      {/* Nav barrr */}
      <header className="top-nav">
        <div className="logo">Movies</div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/movies" className="nav-link">Browse</Link>
          <Link href="/my" className="nav-link">My Stuff</Link>
        </nav>
      </header>

      {/* Top of the website */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Unlimited Movies, Just for You.</h1>
          <p className="hero-subtitle">
            Discover new favorites, search by title, and keep track of what you love.
          </p>
          <div className="hero-buttons">
            <Link href="/movies" className="hero-button hero-button-primary">
              Start Browsing
            </Link>
            <a href="#rows" className="hero-button hero-button-secondary">
              View Rows
            </a>
          </div>
        </div>
      </section>

      {/* Rows of the movies */}
      <section id="rows" className="rows-section">
        <MovieRows />
                <MovieRows />

        <MovieRows />

      </section>
    </main>
  );
}