const express = require('express');
const app = express();

// Routes that were previously in app.js
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js CI/CD Pipeline!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Server setup that was previously in server.js
const port = process.env.PORT || 3000;
// Bind to 0.0.0.0 to make the server accessible from outside the container
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Export both app and server for testing
module.exports = { app, server };