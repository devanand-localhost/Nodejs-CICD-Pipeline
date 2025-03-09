const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js CI/CD Pipeline!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export both app and server for testing
module.exports = { app, server };