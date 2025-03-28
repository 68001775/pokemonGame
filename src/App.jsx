import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./css/App.css";
import Deck from "./components/deck";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="deck">
      <Deck />
    </div>
  );
}

export default App;
