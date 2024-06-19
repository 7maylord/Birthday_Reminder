const nodemailer = require('nodemailer');
const User = require('../models/user.js');

exports.sendBirthdayEmails = async () => {
  try {
    const today = new Date();
    const users = await User.find({ dob: { $eq: today } }).exec();

    const transporter = nodemailer.createTransport({
      service: 'gmail',//'yahoo'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    users.forEach(user => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Happy Birthday!',
        html: `<p>Dear ${user.username},<br>Happy birthday! Wishing you a fantastic day filled with joy and happiness.</p>`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error sending email:', err);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });
  } catch (error) {
    console.error('Error sending birthday emails:', error);
  }
};

