const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js CI/CD Pipeline!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

module.exports = { app };