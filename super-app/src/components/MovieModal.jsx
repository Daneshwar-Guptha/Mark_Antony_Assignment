function MovieModal({ movie, onClose }) {
  const [title, year, rating, runtime, cast, plot, poster] = movie.data;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <article className="movie-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <img src={poster} alt={title} />
        <div>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <h2>{title}</h2>
          <p>
            {movie.category} | {year} | {runtime}
          </p>
          <strong>Rating: {rating}/10</strong>
          <p>{plot}</p>
          <p>
            <b>Cast:</b> {cast}
          </p>
        </div>
      </article>
    </div>
  );
}

export default MovieModal;
