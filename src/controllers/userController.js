const User = require('../models/user.js');

exports.addUser = async (req, res) => {
  try {
    const { username, email, dob } = req.body;

     // Check if email already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).send('Email already exists');
     }

    const newUser = new User({
      username,
      email,
      dob
    });
    await newUser.save();
    res.status(200).send('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
};
