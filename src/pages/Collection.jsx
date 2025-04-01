import React, { useState, useEffect } from "react";
import "../css/deck.css";
import { Scripts } from "react-router-dom";

export default function Collection() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("collection");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setCollection(parsedData.cards || []); // Access "cards" property
      } catch (error) {
        console.error("Error parsing collection:", error);
      }
    }
  }, []);
  //make the className as a string
  function setClassName(card) {
    switch (card.set) {
      case "base1":
        if (card.rarity === "Rare") {
          return "pokemon-rare";
        }
        break;
      case "sv045":
        if (card.name.includes(" ex") || card.rarity.includes("Shiny")) {
          return "pokemon-rare";
        }
        break;
      case "swsh12_5":
        if (card.rarity.includes("Rare") && card.rarity !== "Rare") {
          return "pokemon-rare";
        }
    }
  }
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

    // Close overlay when clicking outside the image
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.style.display = "none";
    };
  };
  return (
    <div>
      <h2>Your Card Collection</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {collection.length > 0 ? (
          collection.map((card, index) => (
            <img
              className={setClassName(card)}
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
