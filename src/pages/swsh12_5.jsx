import { useState } from "react";
import React from "react";
import logos from "../data/setLogos.json";
import "../css/deck.css";
import swsh12_5 from "../data/swsh12_5.json";
import { useOutletContext } from "react-router-dom";

export default function () {
  const [count, setCount] = useState(0);
  let card;

  const { doomDoubloons, setDoomDoubloons } = useOutletContext();

  function getCollection() {
    const collectionData = localStorage.getItem("collection");

    if (!collectionData) {
      return { cards: [] };
    }

    try {
      return JSON.parse(collectionData);
    } catch (error) {
      console.error("Error parsing collection from localStorage", error);
      return { cards: [] };
    }
  }

  function saveCardToCollection(card) {
    const collection = getCollection();
    card.set = "swsh12_5";

    const cardExists = collection.cards.some(
      (existingCard) => existingCard.image === card.image
    );

    if (!cardExists) {
      collection.cards.push(card);
      localStorage.setItem("collection", JSON.stringify(collection));
      console.log("Card saved to localStorage:", card);
    } else {
      console.log("Card already in collection:", card.name);
    }
  }

  function shuffle(set) {
    let currentIndex = set.cards.length;

    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

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
          if (doomDoubloons <= 0) {
            alert("Not enough Doom Doubloons to pull a pack!");
            return;
          }

          setDoomDoubloons(doomDoubloons - 1);

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
            saveCardToCollection(card);

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
                      <img src="${cardData.image}" class="enlarged-card"/>
                    </div>
                  `;
                }

                overlay.style.display = "flex";

                overlay.onclick = function (event) {
                  if (event.target === overlay) {
                    overlay.style.display = "none";
                  }
                };
              };
            })(card);

            div.appendChild(img);
          }
        }}
      />
      <div id="handDiv"></div>
    </>
  );
}
