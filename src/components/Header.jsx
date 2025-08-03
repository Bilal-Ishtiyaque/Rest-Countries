import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const [isDark, setIsDark] = useTheme();

  return (
    <header className="header">
      <div className="headerContent">
        <h2 className="title">
          <Link to={"/"}>REST COUNTRIES</Link>
        </h2>
        <button
          className={`themeChanger ${isDark ? "dark" : ""}`}
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <i className={`fa-regular fa-${isDark ? "sun" : "moon"}`} />
          <span>{isDark ? "Light" : "Dark"} Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
