import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./css/App.css";
import Deck from "./components/deck";
import { Routes, Route } from "react-router-dom";
import Base1 from "./pages/base1";
import Sv045 from "./pages/sv045";
import Collection from "./pages/Collection";
import NavBar from "./components/navbar.jsx";
import Home from "./pages/Home";
import Swsh12_5 from "./pages/swsh12_5.jsx";
function App() {
  return (
    <div className="deck">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base1" element={<Base1 />} />
        <Route path="/sv045" element={<Sv045></Sv045>} />
        <Route path="/swsh12_5" element={<Swsh12_5 />} />
        <Route path="/Collection" element={<Collection />} />
      </Routes>
    </div>
  );
}

export default App;
