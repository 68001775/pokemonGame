import { Link } from "react-router-dom";
import React from "react";
import "../css/navbar.css";

function NavBar({ doomDoubloons }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          Home {doomDoubloons !== undefined ? `(${doomDoubloons})` : ""}
        </Link>
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
        <Link to="/swsh12_5" className="nav-ink">
          Crown Zenith
        </Link>
        <Link to="/sv04" className="nav-ink">
          Paradox Rift
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
