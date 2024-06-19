const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const validator = require('../validators/validator.js')

// Handle POST request to add a new user
router.post('/add', validator.addUserValidation, userController.addUser);

module.exports = router;

