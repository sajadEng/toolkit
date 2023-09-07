import Search from "./Search.js";
import ThemeBtn from "./ThemeBtn.js";

export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <ThemeBtn />
      <Search />
    </nav>
  );
}
