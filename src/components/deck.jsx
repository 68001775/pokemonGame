import React from "react";
import base1 from "../data/base1.json";
import logos from "../data/setLogos.json";
import "../css/deck.css";
import sv045 from "../data/sv04.5.json";

export default function Deck() {
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

    // Add the new card to the collection if it's not already there
    const cardExists = collection.cards.some(
      (existingCard) => existingCard.name === card.name
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

  return <></>;
}
