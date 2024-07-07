const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API requests
app.get('/api/duncan', async (req, res) => {
  try {
    const response = await axios.get('http://backend-service:5000/duncan');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Duncan service');
  }
});

app.get('/api/favio', async (req, res) => {
  try {
    const response = await axios.get('http://backend-service:5000/favio');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Favio service');
  }
});

app.get('/api/zaib', async (req, res) => {
  try {
    const response = await axios.get('http://backend-service:5000/zaib');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Zaib service');
  }
});

// All other routes should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
