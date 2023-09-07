import { useState, useEffect } from "react";
export default function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const stotredWatched = localStorage.getItem(key);
    if (stotredWatched) return JSON.parse(stotredWatched);
    else return initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue];
}
