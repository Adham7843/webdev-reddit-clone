import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard.jsx";
import MovieForm from "./components/MovieForm.jsx";

const STORAGE_KEY = "movies-watchlist";

// Read saved movies from the browser the first time the app loads.
function loadMovies() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [movies, setMovies] = useState(loadMovies);

  // Whenever the list changes, save it. This is the only side effect in the app.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  function addMovie(title) {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const newMovie = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      stars: 0,
      review: "",
    };

    setMovies((current) => [newMovie, ...current]);
  }

  function removeMovie(id) {
    setMovies((current) => current.filter((movie) => movie.id !== id));
  }

  function updateMovie(id, changes) {
    setMovies((current) =>
      current.map((movie) =>
        movie.id === id ? { ...movie, ...changes } : movie
      )
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Movie journal</p>
          <h1>My Watch List</h1>
          <p className="subtitle">
            Add what you watch, give it a star rating, and write a short review.
          </p>
        </div>
        <p className="count-badge">
          <strong>{movies.length}</strong>
          {movies.length === 1 ? " movie" : " movies"}
        </p>
      </header>

      <main>
        <MovieForm onAdd={addMovie} />

        {movies.length === 0 ? (
          <section className="empty-state">
            <p className="empty-number">0/5</p>
            <h2>No movies yet</h2>
            <p>
              Start with the last film you watched. You can rate it and review
              it right after adding it.
            </p>
          </section>
        ) : (
          <section className="movie-grid" aria-label="Saved movies">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={removeMovie}
                onUpdate={updateMovie}
              />
            ))}
          </section>
        )}
      </main>

      <footer className="app-footer">
        Saved in this browser with localStorage.
      </footer>
    </div>
  );
}
