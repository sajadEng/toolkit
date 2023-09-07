import StarRating from "./StarRating";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetail({
  onselectid,
  selectedId,
  onclosemovie,
  KEY,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const rateCountRef = useRef(0);

  useEffect(
    function () {
      if (userRating) rateCountRef.current = rateCountRef.current + 1;
      console.log(rateCountRef);
    },
    [userRating]
  );

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const {
    Title: title,
    Released: released,
    imdbRating,
    Genre: genre,
    Runtime: runtime,
    Director: director,
    Poster: poster,
    Plot: plot,
    Actors: actors,
    Year: year,
  } = movie;

  console.log(isWatched);

  function handleAdd() {
    if (isWatched) return;

    const newWathcedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      countRatingDesisions: rateCountRef.current,
    };

    onAddWatched(newWathcedMovie);
    onclosemovie();
  }

  function handleUserRating(uRating) {
    setUserRating(uRating);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setError("");
          setIsLoading(true);
          const request = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          // if (!request.ok)
          //   throw new Error("something went wrong getting information!");

          const data = await request.json();

          if (data.Response === "False") throw new Error("movie not found");

          setMovie(() => data);
          setIsLoading(() => false);
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && error.length !== 0 ? (
        <ErrorMessage message={error} />
      ) : null}
      {!isLoading && !(error.length !== 0) ? (
        <>
          {" "}
          <header>
            <img src={poster} alt={`${movie} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating &bull; {runtime}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onSetRating={handleUserRating}
                    defaultRating={isWatched && movie.userRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated {watchedUserRating} with this movie </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>
              Starred <span>{actors}</span>
            </p>
            <p>
              Director <span>{director}</span>
            </p>
          </section>
        </>
      ) : null}
    </div>
  );
}
