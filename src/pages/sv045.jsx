import { useState } from "react";
import React from "react";
import base1 from "../data/base1.json";
import logos from "../data/setLogos.json";
import "../css/deck.css";
import sv045 from "../data/sv04.5.json";
import { useOutletContext } from "react-router-dom"; // <-- added

export default function () {
  const [count, setCount] = useState(0);
  let card;

  // Get doomDoubloons and setter from context
  const { doomDoubloons, setDoomDoubloons } = useOutletContext(); // <-- added

  function getCollection() {
    const collectionData = localStorage.getItem("collection");
    if (!collectionData) return { cards: [] };
    try {
      return JSON.parse(collectionData);
    } catch (error) {
      console.error("Error parsing collection from localStorage", error);
      return { cards: [] };
    }
  }

  function saveCardToCollection(card) {
    const collection = getCollection();
    card.set = "sv045";
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
        className="sv045 logo"
        src={logos["sv04.5"].logo}
        onClick={async () => {
          if (doomDoubloons <= 45) {
            alert("Not enough Doom Doubloons to pull a pack!");
            return;
          }

          // Subtract 1 doubloon
          setDoomDoubloons(doomDoubloons - 45);

          let set = {
            cards: sv045.pokemon,
          };
          let rareCount = 0;
          var div = document.getElementById("handDiv");

          while (div.firstChild) {
            div.removeChild(div.firstChild);
          }

          for (let i = 0; i < 10; i++) {
            await shuffle(set);
            card = set.cards[0];

            let img = document.createElement("img");
            await shuffle(set);
            card = set.cards[0];

            if (
              (card.name.includes("ex") || card.rarity.includes("Shiny")) &&
              rareCount > 0
            ) {
              do {
                await shuffle(set);
                card = set.cards[0];
              } while (
                card.name.includes("ex") ||
                card.rarity.includes("Shiny")
              );
            } else if (
              (card.name.includes("ex") || card.rarity.includes("Shiny")) &&
              rareCount === 0
            ) {
              rareCount++;
              img.className = "pokemon-rare pokemonCard";
              saveCardToCollection(card);
            }
            if (
              (card.name.includes("ex") || card.rarity.includes("Shiny")) !==
              true
            ) {
              img.className = "pokemonCard";
              saveCardToCollection(card);
            }
            img.src = card.image;

            img.onclick = (function (cardData) {
              return function () {
                let overlay = document.getElementById("cardOverlay");
                if (!overlay) {
                  overlay = document.createElement("div");
                  overlay.id = "cardOverlay";
                  document.body.appendChild(overlay);
                }
                if (img.className.includes("pokemon-rare")) {
                  console.log("rare Pokemon" + img.className);
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

            document.getElementById("handDiv").appendChild(img);
          }
        }}
      />
      <div id="handDiv"></div>
    </>
  );
}
