import "./css/App.css";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/navbar";
import Home from "./pages/Home";
import Base1 from "./pages/base1";
import Sv045 from "./pages/sv045";
import Swsh12_5 from "./pages/swsh12_5";
import Sv04 from "./pages/svo4";
import Collection from "./pages/Collection";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [doomDoubloons, setDoomDoubloons] = useState(() => {
    const savedCount = localStorage.getItem("doomDoubloons");
    return savedCount ? JSON.parse(savedCount) : 20; // Start at saved count or zero
  });

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Short loading effect on route change
    return () => clearTimeout(timeout);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("doomDoubloons", JSON.stringify(doomDoubloons)); // Save to local storage
  }, [doomDoubloons]);

  return (
    <div className="deck">
      <NavBar doomDoubloons={doomDoubloons} />
      {loading && <div className="loading-screen"></div>}
      <Outlet context={{ doomDoubloons, setDoomDoubloons }} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />}>
        <Route index element={<Home />} />
        <Route path="base1" element={<Base1 />} />
        <Route path="sv045" element={<Sv045 />} />
        <Route path="swsh12_5" element={<Swsh12_5 />} />
        <Route path="sv04" element={<Sv04 />} />
        <Route path="collection" element={<Collection />} />
      </Route>
    </Routes>
  );
}

export default App;
