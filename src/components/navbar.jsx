import { Link } from "react-router-dom";
import "../css/navbar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-links">
        <Link to="/Collection" className="nav-ink">
          Collection
        </Link>
        <Link to="/base1" className="nav-ink">
          Base Set
        </Link>
        <Link to="/sv045" className="nav-ink">
          Paldean Fates
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
