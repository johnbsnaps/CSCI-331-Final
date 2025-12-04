import Link from 'next/link';
import Movies from '../components/Movies';

export default function MoviesPage() {
  return (
    <main className="page">
      <header className="top-nav">
        <div className="logo">Movies</div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/movies" className="nav-link active">
            Browse
          </Link>
          <Link href="/my" className="nav-link">
            My Stuff
          </Link>
        </nav>
      </header>

      <Movies />
    </main>
  );
}
