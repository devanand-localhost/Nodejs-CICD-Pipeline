const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js CI/CD Pipeline!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// We export the app but don't start the server here
// This allows us to import it in server.js and also in tests
module.exports = app;