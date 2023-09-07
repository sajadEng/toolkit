import { useEffect, useState } from "react";

import './../styles/watch-with-me/index.css'
import './../styles/watch-with-me/animation.css'

import Box from "../components/watch-with-me/Box";
import ErrorMessage from "../components/watch-with-me/ErrorMessage";
import Loader from "../components/watch-with-me/Loader";
import Main from "../components/watch-with-me/Main";
import MovieDetail from "../components/watch-with-me/MovieDetail";
import Search from "../components/watch-with-me/Search";
import MoviesList from "../components/watch-with-me/MoviesList";
import WatchedMoviesList from "../components/watch-with-me/WatchedMoviesList";
import WatchedSummary from "../components/watch-with-me/WatchedSummary";
import CloseBtn from "../components/watch-with-me/CloseBtn";
import useMovies from "../components/watch-with-me/useMovies";
import useLocalStorageState from "../components/watch-with-me/useLocalStorageState";

const KEY = "826f1c63";

export default function WatchWithMe() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSearch(result) {
    setQuery((cur) => result);
  }

  function handleSelectMovie(id) {
    setSelectedId((cur) => (cur === id ? null : id));
    setIsOpen1((cur) => false);
  }

  function handleCloseMovie() {
    setSelectedId(null);
    // document.title = "usePopcorn";
  }

  function handleAddWatched(movie) {
    setWatched((cur) => [...cur, movie]);
  }

  function handleRemoveWatched(movie) {
    setWatched((cur) => cur.filter((tmovie) => tmovie.imdbId !== movie.imdbId));
  }

  const [movies, error, isLoading] = useMovies(query);

  return (
    <>
      <Search onsearch={handleSearch} />
      <WatchedSummary watched={watched} />
      <Main>
        {isOpen1 ? (
          <Box clas="movies-list">
            {isLoading ? (
              <Loader />
            ) : error.length !== 0 ? (
              <ErrorMessage message={error} />
            ) : (
              <MoviesList movies={movies} onmovieselect={handleSelectMovie} />
            )}
          </Box>
        ) : (
          <Box>
            {selectedId ? (
              <MovieDetail
                selectedId={selectedId}
                onclosemovie={handleCloseMovie}
                onselectid={setSelectedId}
                onAddWatched={handleAddWatched}
                KEY={KEY}
                watched={watched}
              />
            ) : (
              <>
                <WatchedMoviesList
                  watched={watched}
                  onRemoveWatched={handleRemoveWatched}
                />
              </>
            )}
          </Box>
        )}

        <CloseBtn setIsOpen={setIsOpen1} isOpen={isOpen1} />
      </Main>
    </>
  );
}
