import React from "react";
import { useOutletContext } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const { doomDoubloons } = useOutletContext(); // Get the context

  return (
    <div>
      <h1>Welcome to Pokémon Gamble!</h1>
      <h3>Nathan Woodring, Collin Wimberly, Lukah Youngs</h3>
      <p>
        Gamble your life savings away on a children's card game! Feel the rush!
      </p>
      <div className="doomdiv">
        <img className="money" src="/DoomDoubloon.png" alt="doom doubloon" />
        <p>Doom Doubloons: {doomDoubloons}</p>
      </div>
    </div>
  );
}

export default Home;
