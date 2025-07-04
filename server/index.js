const express = require('express');
const path = require('path');
const askFactoryBot = require('./askFactoryBot');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve static frontend files from the client folder
app.use(express.static(path.join(__dirname, '..', 'client')));

// API endpoint to ask AI about raw material
app.post('/ask', async (req, res) => {
  try {
    const { name, cost, quantity } = req.body;

    if (!name || !cost || !quantity) {
      return res.status(400).json({ error: 'Please provide name, cost, and quantity.' });
    }

    // Call your AI function with structured input
    const answer = await askFactoryBot({ name, cost, quantity });

    res.json({ response: answer });
  } catch (error) {
    console.error('Error in /ask:', error);
    res.status(500).json({ error: 'Failed to get AI response.' });
  }
});

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
