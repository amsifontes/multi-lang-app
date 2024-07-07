const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();
const port = 5000;

// TODO: confirm if configuring for CORS is needed
app.use(cors());

const SERVICE_NAME_JAVA = 'java-service';
const SERVICE_NAME_RUST = 'rust-service';
const SERVICE_NAME_DART = 'dart-service';
const NAMESPACE = 'default';
const CLUSTER_DOMAIN = 'cluster.local';


app.get('/duncan', async (req, res) => {
  try {
    const response = await axios.get('http://java-service:8080/');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Java service. Error: ' + error);
  }
});

app.get('/favio', async (req, res) => {
  try{
    const response = await axios.get('http://rust-service:8081/');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Rust service. Error: ' + error);
  }
});

app.get('/zaib', async (req, res) => {
  try {
    const response = await axios.get('http://dart-service:8082/');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching from Dart service. Error: ' + error);
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
