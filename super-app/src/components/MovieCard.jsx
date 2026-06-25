function MovieCard({ movie, onSelect }) {
  return (
    <button className="movie-card" type="button" onClick={() => onSelect(movie)}>
      <img src={movie[6]} alt={movie[0]} />
    </button>
  );
}

export default MovieCard;
