const app = require('./app');

const port = process.env.PORT || 3000;
// Bind to 0.0.0.0 instead of the default 127.0.0.1
// This allows connections from outside the container
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

// Export server for graceful shutdown in tests
module.exports = server;