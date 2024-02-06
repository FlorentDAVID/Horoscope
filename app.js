const express = require('express');
const app = express();
const horoscope = require('horoscope');


// Function to handle the sign request
function handleSignRequest(req, res) {

    // Check the day an month format
    if(isNaN(Number(req.query.day))){
        return res.status(400).send("day must be a number");
    }

    if(isNaN(Number(req.query.month))){
        return res.status(400).send("month must be a number");
    }

    const day = parseInt(req.query.day);
    const month = parseInt(req.query.month);

    // Check the range of day and month
    if (month < 1 || month > 12) {
        return res.status(400).send("Month must be in the range of 1 to 12");
    }

    if (day < 1 || day > 31) {
        return res.status(400).send("Day must be in the range of 1 to 31");
    }

    // Determine the zodiac sign using the horoscope library
    const sign = horoscope.getSign({ day: day, month: month });

    // Send the zodiac sign as the response
    res.send(`The zodiac sign for ${day}/${month} is ${sign}`);
}

// Endpoint to handle the /sign path
app.get('/sign', handleSignRequest);

// Endpoint to handle the /signByDate path
app.get('/signByDate', (req, res) => {
    const date = req.query.date;
    const parsedDate = new Date(date);

    // validate the date
    if(isNaN(parsedDate)){
        return res.status(400).send("Invalid date");
    }

    // Extract day and month from the parsed date
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1; // Adding 1 as getMonth returns 0-based month
  
    // Call the handleSignRequest function with the parsed day and month
    req.query.day = day.toString();
    req.query.month = month.toString();
    handleSignRequest(req, res);
});



module.exports = {
    app: app,
    start: function (port) {
      return new Promise((resolve, reject) => {
        const server = app.listen(port, (err) => {
          if (err) return reject(err);
          console.log(`Horoscope server is running on port ${port}`);
          resolve(server);
        });
      });
    }
  };

