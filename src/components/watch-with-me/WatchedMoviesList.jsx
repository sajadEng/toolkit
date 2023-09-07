import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.length > 0 ? (
        watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onRemoveWatched={onRemoveWatched}
          />
        ))
      ) : (
        <p className="empty-list-warning">your watch list is empty</p>
      )}
    </ul>
  );
}
