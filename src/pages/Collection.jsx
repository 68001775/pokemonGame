import React, { useState, useEffect } from "react";
import "../css/deck.css";
import { Scripts } from "react-router-dom";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedData = localStorage.getItem("collection");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const cards = parsedData.cards || [];
        setCollection(cards);
        setDisplayedCards(cards);
      } catch (error) {
        console.error("Error parsing collection:", error);
      }
    }
    setLoading(false); // Finish loading after processing
  }, []);

  function setClassName(card) {
    switch (card.set) {
      case "base1":
        if (card.rarity === "Rare") return "pokemon-rare";
        break;
      case "sv045":
        if (card.name.includes(" ex") || card.rarity.includes("Shiny"))
          return "pokemon-rare";
        break;
      case "swsh12_5":
        if (
          card.rarity.toLowerCase().includes("rare") &&
          card.rarity !== "Rare"
        )
          return "pokemon-rare";
        break;
      case "sv04":
        if (card.rarity.toLowerCase().includes("rare")) return "pokemon-rare";
        break;
      default:
        return "";
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setDisplayedCards(
      collection.filter((card) => card.name.toLowerCase().includes(query))
    );
  };

  const sortAZ = () => {
    const sorted = [...displayedCards].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setDisplayedCards(sorted);
  };

  const sortRecent = () => {
    const reversed = [...collection].slice().reverse();
    const filtered = reversed.filter((card) =>
      card.name.toLowerCase().includes(searchQuery)
    );
    setDisplayedCards(filtered);
  };

  const sortOldest = () => {
    const filtered = [...collection].filter((card) =>
      card.name.toLowerCase().includes(searchQuery)
    );
    setDisplayedCards(filtered);
  };
  const sortByRarity = () => {
    const sorted = [...displayedCards].sort((a, b) => {
      const aRare = setClassName(a) === "pokemon-rare" ? 1 : 0;
      const bRare = setClassName(b) === "pokemon-rare" ? 1 : 0;
      return bRare - aRare; // put rare cards first
    });
    setDisplayedCards(sorted);
  };
  const sortByPack = () => {
    const packOrder = ["base1", "sv04", "swsh12_5", "sv04"]; // confirm these are correct

    const sorted = [...displayedCards].sort((a, b) => {
      console.log("Sorting sets:", a.set, b.set); // log each comparison

      const indexA = packOrder.indexOf(a.set || "");
      const indexB = packOrder.indexOf(b.set || "");

      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

    setDisplayedCards(sorted);
  };

  const imageBigger = (event, cardData) => {
    let overlay = document.getElementById("cardOverlay");

    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "cardOverlay";
      document.body.appendChild(overlay);
    }

    const isRare = event.target.classList.contains("pokemon-rare");
    overlay.innerHTML = `
      <div class="overlay-content">
        <img src="${cardData.image}" class="${
      isRare ? "pokemon-rare" : ""
    } enlarged-card"/>
      </div>
    `;

    overlay.style.display = "flex";

    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    };
  };

  if (loading) {
    return <div className="loading-screen">Loading your collection...</div>;
  }

  return (
    <div>
      <h2>Your Card Collection</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button onClick={sortAZ}>Sort A → Z</button>
        <button onClick={sortRecent} style={{ marginLeft: "5px" }}>
          Sort Recent
        </button>
        <button onClick={sortOldest} style={{ marginLeft: "5px" }}>
          Sort Oldest
        </button>
        <button onClick={sortByRarity} style={{ marginLeft: "5px" }}>
          Sort by Rarity ↓
        </button>
        <button onClick={sortByPack} style={{ marginLeft: "5px" }}>
          Sort by Pack
        </button>
      </div>

      <div style={{ flexWrap: "wrap", gap: "10px" }}>
        {displayedCards.length > 0 ? (
          displayedCards.map((card, index) => (
            <img
              className={setClassName(card) + " collectionCard"}
              key={index}
              src={card.image.replace("high.png", "low.png")}
              alt={card.name}
              style={{
                width: "150px",
                height: "auto",
                border: "1px solid black",
              }}
              onClick={(event) => imageBigger(event, card)}
            />
          ))
        ) : (
          <p>No cards in your collection.</p>
        )}
      </div>
    </div>
  );
}
