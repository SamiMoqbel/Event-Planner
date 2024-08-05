const express= require("express");
const connectToMongoDB = require("./db/connectToMongoDB");
const cors = require('cors');
const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Middleware to parse JSON bodies

const PORT= 5000;

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  link: String
});

const Card = mongoose.model('Card', cardSchema);

app.use(cors());
app.use(express.json());

app.get('/Events', async (req, res) => {
  try {
    const cards = await Card.find({});
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cards data', error });
  }
});

app.post('/add-card', async (req, res) => {
  const { title, description, date, link } = req.body;
  const newCard = new Card({ title, description, date, link });

  try {
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: 'Error adding new card', error });
  }
});

app.put("/edit-card/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const { title, description, date, link } = req.body;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { title, description, date, link },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: "Error updating card", error });
  }
});

app.delete("/remove-card/:cardId", async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
});

app.listen(PORT, () => { 
    connectToMongoDB();
    console.log(`Server Running on PORT ${PORT}`);
});