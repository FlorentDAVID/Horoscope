const { start } = require('./app'); // Import the start function

// Start the server listening on port 8080
start(8080)
  .then(server => {
    console.log('Horoscope server ready');
  })
  .catch(err => {
    console.error('Error starting the server:', err);
  });
