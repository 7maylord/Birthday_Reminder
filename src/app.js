const express = require("express");
const cron = require("node-cron");
const userRoutes = require("./routes/userRoutes");
const birthdayEmailService = require("./services/birthdayEmailService");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML and CSS)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});

// Schedule cron job for sending birthday emails

// Specify your desired timezone
const timezone = "Africa/Lagos"; // Change to your desired timezone

cron.schedule(
  "0 7 * * *",
  () => {
    const timestamp = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss Z");

    // Log to console
    console.log("Cronjob running at:", timestamp);

    // Log to file
    fs.appendFileSync("cronjob.log", `Cronjob ran at ${timestamp}\n`);

    // Add your reminder logic here (e.g., sending emails, updating database)
    birthdayEmailService
      .sendBirthdayEmails()
      .then(() => {
        console.log("Birthday emails sent successfully.");
        fs.appendFileSync(
          "cronjob.log",
          `Birthday emails sent successfully at ${timestamp}\n`
        );
      })
      .catch((error) => {
        console.error("Error sending birthday emails:", error);
        fs.appendFileSync(
          "cronjob.log",
          `Error sending birthday emails at ${timestamp}: ${error.message}\n`
        );
      });
  },
  {
    timezone: timezone,
  }
);

module.exports = app;
