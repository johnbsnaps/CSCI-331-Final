// src/app/my/page.jsx
import Link from 'next/link';

export default function MyPage() {
  return (
    <main className="page my-page">
      <header className="top-nav">
        <div className="logo">Movies</div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/movies" className="nav-link">Browse</Link>
          <Link href="/my" className="nav-link active">My Stuff</Link>
        </nav>
      </header>

      <section className="my-content">
        <h1>My Movies</h1>
        <p>This is your personal section for movies you’ve rated and reviewed.</p>
        <p style={{ opacity: 0.7, marginTop: '8px' }}>
          (Next step: hook this up to localStorage or a backend to store ratings.)
        </p>
      </section>
    </main>
  );
}