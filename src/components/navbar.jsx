import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "../css/navbar.css";

function NavBar({ doomDoubloons }) {
  const location = useLocation();
  const [activeLeft, setActiveLeft] = useState(0);
  const itemRefs = useRef([]);

  const paths = ["/", "/Collection", "/base1", "/sv045", "/swsh12_5", "/sv04"];

  useEffect(() => {
    const index = paths.indexOf(location.pathname);
    if (index !== -1 && itemRefs.current[index]) {
      const item = itemRefs.current[index];
      const offsetLeft = item.offsetLeft;
      setActiveLeft(offsetLeft);
    }
  }, [location.pathname]);

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav--list">
          <div className="active" style={{ left: `${activeLeft}px` }}></div>

          {paths.map((path, index) => (
            <li
              key={path}
              className="item"
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <Link to={path}>
                {path === "/"
                  ? `Home ${
                      doomDoubloons !== undefined ? `(${doomDoubloons})` : ""
                    }`
                  : path === "/Collection"
                  ? "Collection"
                  : path === "/base1"
                  ? "Base Set"
                  : path === "/sv045"
                  ? "Paldean Fates"
                  : path === "/swsh12_5"
                  ? "Crown Zenith"
                  : "Paradox Rift"}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
