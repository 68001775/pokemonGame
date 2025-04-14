import { useState } from "react";
import React from "react";
import logos from "../data/setLogos.json";
import "../css/deck.css";
import swsh12_5 from "../data/swsh12_5.json";
export default function () {
  const [count, setCount] = useState(0);
  let card;

  // Function to get the collection from localStorage
  function getCollection() {
    const collectionData = localStorage.getItem("collection");

    if (!collectionData) {
      return { cards: [] }; // If no collection exists, return an empty collection
    }

    try {
      return JSON.parse(collectionData); // Parse the stored JSON data
    } catch (error) {
      console.error("Error parsing collection from localStorage", error);
      return { cards: [] };
    }
  }

  // Function to save a card to the localStorage collection
  function saveCardToCollection(card) {
    const collection = getCollection();
    card.set = "swsh12_5";
    // Add the new card to the collection if it's not already there
    const cardExists = collection.cards.some(
      (existingCard) => existingCard.image === card.image
    );

    if (!cardExists) {
      collection.cards.push(card); // Add new card if not already in collection
      localStorage.setItem("collection", JSON.stringify(collection)); // Save to localStorage
      console.log("Card saved to localStorage:", card);
    } else {
      console.log("Card already in collection:", card.name);
    }
  }

  function shuffle(set) {
    let currentIndex = set.cards.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [set.cards[currentIndex], set.cards[randomIndex]] = [
        set.cards[randomIndex],
        set.cards[currentIndex],
      ];
    }
  }

  return (
    <>
      <img
        className="swsh12_5 logo"
        src={logos["swsh12_5"].logo}
        onClick={async () => {
          let set = {
            cards: swsh12_5.pokemon,
          };

          var div = document.getElementById("handDiv");
          let rareCount = 0;

          while (div.firstChild) {
            div.removeChild(div.firstChild);
          }
          for (let i = 0; i < 10; i++) {
            await shuffle(set);
            card = set.cards[0];

            let img = document.createElement("img");
            await shuffle(set);
            card = set.cards[0];
            img.className = "pokemonCard";
            if (
              card.rarity.toLowerCase().includes("rare") &&
              card.rarity !== "Rare" &&
              rareCount > 0
            ) {
              do {
                await shuffle(set);
                card = set.cards[0];
              } while (
                card.rarity.toLowerCase().includes("rare") &&
                card.rarity !== "Rare"
              );
            } else if (
              card.rarity.toLowerCase().includes("rare") &&
              card.rarity !== "Rare" &&
              rareCount === 0
            ) {
              console.log(`Rare pulled, ${card.name}.`);
              rareCount++;
              img.className = "pokemon-rare pokemonCard";
            } else if (!(img.class === "pokemon-rare pokemonCard")) {
              console.log("Common Pulled");
            }
            console.log(rareCount);
            img.src = card.image;
            saveCardToCollection(card); // Save the card to localStorage

            img.onclick = (function (cardData) {
              return function () {
                let overlay = document.getElementById("cardOverlay");
                if (!overlay) {
                  overlay = document.createElement("div");
                  overlay.id = "cardOverlay";
                  document.body.appendChild(overlay);
                }
                if (img.className.includes("pokemon-rare")) {
                  overlay.innerHTML = `
                <div class="overlay-content">
                  <img src="${cardData.image}" class="pokemon-rare enlarged-card"/>
                </div>
              `;
                } else {
                  console.log("Normal Pokemon" + img.className);
                  overlay.innerHTML = `
                <div class="overlay-content">
                  <img src="${cardData.image}" class=" enlarged-card"/>
                </div>
              `;
                }

                overlay.style.display = "flex";

                // Close overlay when clicking outside the image
                overlay.onclick = function (event) {
                  if (event.target === overlay) {
                    overlay.style.display = "none";
                  }
                };
              };
            })(card);

            document.getElementById("handDiv").appendChild(img);
          }
        }}
      />
      <div id="handDiv"></div>
    </>
  );
}
