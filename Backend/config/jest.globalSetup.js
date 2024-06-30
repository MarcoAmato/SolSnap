const server = require( '../src/server');

module.exports = async () => {
  if (!global.__SERVER__) {
    global.__SERVER__ = server.listen(3061, () => console.log('Test server started on port 3061'));
    console.log('Server started for testing');
  } else {
    console.log('Reusing existing server for testing');
  }
};