import { useState } from "react";

export default function MovieForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="movie-title">
        Movie title
      </label>
      <input
        id="movie-title"
        className="movie-input"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Which movie did you watch?"
        autoComplete="off"
      />
      <button className="add-button" type="submit">
        Add movie
      </button>
    </form>
  );
}
