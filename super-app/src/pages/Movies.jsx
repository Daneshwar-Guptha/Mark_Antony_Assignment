import MovieCard from "../components/MovieCard";
import { getMoviesByCategory } from "../services/movieApi";
import userAvatar from "../assets/userAvatar.png"

function Movies({ selected, onHome, onMovieSelect, user }) {
  const visibleCategories = selected.length ? selected : ["Action", "Thriller", "Horror"];

  return (
    <section className="movies-page">
      <header>
        <h1 className="brand">Super app</h1>
        <button type="button" onClick={onHome}>
          <img
            src={userAvatar}
            alt={`${user.name} avatar`}
          />
        </button>
      </header>
      <h2>Entertainment according to your choice</h2>
      {visibleCategories.map((category) => (
        <section className="movie-row" key={category}>
          <h3>{category}</h3>
          <div>
            {getMoviesByCategory(category).map((movie) => (
              <MovieCard
                key={movie[0]}
                movie={movie}
                onSelect={(selectedMovie) => onMovieSelect({ category, data: selectedMovie })}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default Movies;
