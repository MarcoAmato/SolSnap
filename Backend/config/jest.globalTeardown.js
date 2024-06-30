module.exports = async () => {
  if (global.__SERVER__) {
    console.log('Starting server teardown');
    await new Promise((resolve, reject) => {
      global.__SERVER__.close((err) => {
        if (err) {
          console.error('Failed to close server', err);
          reject(err);
        } else {
          console.log('Server closed');
          resolve();
        }
      });
    });
  } else {
    console.log('No server instance found for teardown');
  }
};