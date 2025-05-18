import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";

function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme ? "light" : "dark";
    setTheme(!theme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <header className="main-header">
      <p className="logo" onClick={goToHome}>
        CarVia
      </p>
      <div className="header-icons">
        <span onClick={toggleTheme}>{theme ? <RiSunFill size={36} /> : <RiMoonClearFill size={36} />}</span>
        <FaUserCircle size={36} onClick={goToProfile} />
      </div>
    </header>
  );
}

export default Header;
