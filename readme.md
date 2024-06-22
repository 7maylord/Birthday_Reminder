# Birthday Reminder Cronjob
This Node.js application is designed to send birthday reminder emails using a cronjob. It retrieves users from a database whose birthdays match the current date and sends them personalized birthday wishes via email.

## Requirements
- Create a simple UI interface to collect date of births, username and email. No need to collect other information
- Every day at 7am, a cron job will run to check your database for whose birthday is today.
- Using any free email platform(recommending: gmail with nodemailer), send an email to birthday celebrants. Use any form of well wishes or design for the email.

## Features
- Automatically sends birthday emails to users based on their date of birth.
- Uses cron scheduling to run the birthday reminder job daily.
- Logs email sending activities for tracking and debugging.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/7maylord/Birthday_Reminder.git
   cd birthday-reminder-cronjob

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add your configuration variables:
    ```plaintext
    PORT=4000
    # MongoDB connection string
    MONGODB_URI=mongodb://localhost:27017/databasename

    # SMTP email configuration
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
    Replace MONGODB_URI with your MongoDB connection string and EMAIL_USER, EMAIL_PASS with your SMTP server credentials.
    ```

4. Start the server:

    ```bash
    npm start
    ```
This command starts the Node.js application and initiates the cronjob to send birthday emails daily.


## Usage
- Adding Users: Add users to the MongoDB database with their dob (date of birth) field formatted as YYYY-MM-DD.
- Email Log: Check the emailLog collection in MongoDB to view logs of sent emails.

## Cronjob Schedule
The cronjob is scheduled to run daily to check for users whose birthday matches the current date and sends them birthday wishes via email.

## Logging
Email sending activities are logged in the MongoDB emailLog collection with timestamps and recipient details for tracking purposes.

## Dependencies
Before running this application, ensure you have the following installed:

- Mongoose: Used for interacting with MongoDB.
- Nodemailer: for sending emails.
- express: Fast, unopinionated, minimalist web framework for Node.js.
- Node-cron: Used for scheduling the cron job
- Joi: Used for data validation.
- Moment-timezone: Used for handling dates and times with timezone support
- Dotenv: Used for loading environment variables from a .env file.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

This README file provides an overview of the application, installation instructions, usage guidelines, and other relevant information necessary for users and developers.