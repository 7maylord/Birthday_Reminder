const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const birthdayEmailService = require('./services/birthdayEmailService');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML and CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', userRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});


 // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Schedule cron job for sending birthday emails
//cron.schedule('0 7 * * *', birthdayEmailService.sendBirthdayEmails);

cron.schedule('0 7 * * *', birthdayEmailService.sendBirthdayEmails, {
  timezone: 'Africa/Lagos'
});

module.exports = app;
