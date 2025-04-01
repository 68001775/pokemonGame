import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./css/App.css";
import Deck from "./components/deck";
import { Routes, Route } from "react-router-dom";
import Base1 from "./pages/base1";
import Sv045 from "./pages/sv045";
import Collection from "./pages/Collection";
import NavBar from "./components/navbar.jsx";
function App() {
  return (
    <div className="deck">
      <NavBar />
      <Routes>
        <Route path="/" element={<Deck />} />
        <Route path="/base1" element={<Base1 />} />
        <Route path="/sv045" element={<Sv045></Sv045>} />
        <Route path="/Collection" element={<Collection />} />
      </Routes>
    </div>
  );
}

export default App;
