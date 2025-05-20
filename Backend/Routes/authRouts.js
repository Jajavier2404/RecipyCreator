const express = require('express');
const { signup, login } = require('../Controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;