import { useEffect, useState } from "react";

const KEY = "826f1c63";

export default function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function searchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const request = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!request.ok)
            throw new Error("something went wrong getting information!");

          const data = await request.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("Movie Not Found");
          }

          setIsLoading(false);
          setMovies(data.Search);
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error.message);
            setIsLoading(false);
          }
        }
      }

      //   handleCloseMovie();

      if (query.length < 3) {
        setMovies((cur) => []);
        setError("");
        return;
      }

      searchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return [movies, error, isLoading];
}
