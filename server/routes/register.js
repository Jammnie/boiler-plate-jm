const express = require('express');
const router = express.Router();
const {registerUser } = require('../controller/register');

router.post('/', registerUser);

module.exports = router;