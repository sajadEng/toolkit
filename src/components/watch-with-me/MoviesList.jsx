import Movie from "./Movie";

export default function MoviesList({ movies, onmovieselect }) {
  return (
    <ul className="list-movies">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Movie
            movie={movie}
            key={movies.indexOf(movie)}
            onselect={onmovieselect}
          />
        ))
      ) : (
        <p className="empty-list-warning">Search for something first</p>
      )}
    </ul>
  );
}
