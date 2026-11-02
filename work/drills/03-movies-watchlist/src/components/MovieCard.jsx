const STAR_VALUES = [1, 2, 3, 4, 5];

export default function MovieCard({ movie, onRemove, onUpdate }) {
  return (
    <article className="movie-card">
      <div className="card-top">
        <h2>{movie.title}</h2>
        <button
          className="remove-button"
          type="button"
          onClick={() => onRemove(movie.id)}
          aria-label={`Remove ${movie.title}`}
        >
          Remove
        </button>
      </div>

      <div className="rating-block">
        <div
          className="star-buttons"
          role="group"
          aria-label={`Rate ${movie.title}`}
        >
          {STAR_VALUES.map((value) => (
            <button
              key={value}
              className={
                value <= movie.stars ? "star-button is-on" : "star-button"
              }
              type="button"
              onClick={() => onUpdate(movie.id, { stars: value })}
              aria-label={`Give ${value} out of 5 stars`}
              title={`${value} / 5`}
            >
              ⭐
            </button>
          ))}
        </div>

        <p className="rating-text">
          {movie.stars > 0
            ? `You gave ${"⭐".repeat(movie.stars)} (${movie.stars}/5)`
            : "No rating yet — tap a star."}
        </p>
      </div>

      <label className="review-label" htmlFor={`review-${movie.id}`}>
        Your review
      </label>
      <textarea
        id={`review-${movie.id}`}
        className="review-input"
        value={movie.review}
        onChange={(event) =>
          onUpdate(movie.id, { review: event.target.value })
        }
        placeholder="What did you think? (saved as you type)"
        rows={3}
      />
    </article>
  );
}
