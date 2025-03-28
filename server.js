import express, { json } from "express";
import { existsSync, writeFileSync, readFile, writeFile, mkdirSync } from "fs";
import cors from "cors";
import path from "path";

const app = express();
app.use(json());
app.use(cors());

const DATA_DIR = path.resolve("src/data"); // Ensure correct path
const COLLECTION_FILE = path.join(DATA_DIR, "collection.json");

// Ensure the data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure collection.json exists
if (!existsSync(COLLECTION_FILE)) {
  writeFileSync(COLLECTION_FILE, JSON.stringify({ cards: [] }, null, 2));
}

app.post("/saveCard", (req, res) => {
  const newCard = req.body;

  readFile(COLLECTION_FILE, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error reading collection" });

    let collection;
    try {
      collection = data.trim() ? JSON.parse(data) : { cards: [] }; // Handle empty file
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Invalid JSON format in collection file" });
    }

    collection.cards.push(newCard);

    console.log(`Writing to file: ${COLLECTION_FILE}`);

    writeFile(COLLECTION_FILE, JSON.stringify(collection, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Error saving card" });
      res.json({ message: "Card saved!", card: newCard });
      console.log("Card saved to collection.");
      console.log(collection);
    });
  });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000, accessible on LAN");
});

//netstat -ano | findstr :5000
