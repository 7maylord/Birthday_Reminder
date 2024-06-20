const nodemailer = require('nodemailer');
const User = require('../models/user.js');
const EmailLog = require('../models/emailLog.js')
const dotenv = require('dotenv');

dotenv.config();

exports.sendBirthdayEmails = async () => {
  try {
    //Retrieves today's date.
    const today = new Date().toISOString().slice(0, 10); // Format date to YYYY-MM-DD

    //Queries the database (User model) to find users whose dob (date of birth) matches today's date ($eq: today)
    const users = await User.find({ dob: { $eq: today } }).exec();

    //Creates a nodemailer transporter using Gmail's SMTP service
    const transporter = nodemailer.createTransport({
      service: 'gmail',//'yahoo'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Iterates through the users array, sending a birthday email to each user.
    users.forEach(user => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Happy Birthday!',
        html: `<p>Dear ${user.username},<br>Happy birthday! Wishing you a fantastic day filled with joy and happiness.</p>`
      };

      // Logs successful emails sent to EmailLog model and handles errors in sending emails.
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          const log = new EmailLog({
            recipient: user.email
          });
          log.save();
          console.log('Email sent:', info.response);

        }
      });
    });
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
};

