const server = require('../../src/server.js'); // Adjust the path as necessary

module.exports = async () => {
  global.__SERVER__ = server.listen(3061); // Use your preferred port
};