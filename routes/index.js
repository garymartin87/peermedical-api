const express = require('express');
const router = express.Router();

//const { check } = require('express-validator/check');

// hello
router.get('/', ({ res }) => res.send('peermedical-api available'));

module.exports = router;