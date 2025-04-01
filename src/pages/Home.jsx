import "../css/Home.css";

function Home() {
  return (
    <div>
      <h1>Welcome to Pokémon Gamble!</h1>
      <h3>Nathan Woodring, Collin Wimberly, Lukah Youngs</h3>
      <p>
        Gamble your life savings away on a children's card game! Feel the rush!
      </p>
      <div className="doomdiv">
        <img className="money" src="/DoomDoubloon.png" alt="doom doubloon" />
        {"Doom Doubloons: "}
      </div>
    </div>
  );
}

export default Home;
