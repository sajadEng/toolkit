import { useEffect, useState } from "react";

export default function ThemeBtn() {
  const [isDark, setIsDark] = useState(false);

  useEffect(
    function () {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    },
    [isDark]
  );

  return (
    <button onClick={(event) => setIsDark((cur) => !cur)}>
      {isDark ? "light" : "dark"}
    </button>
  );
}
