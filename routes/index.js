const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// hello
router.get('/', ({ res }) => res.send('peermedical-api available'));

// users
router.use('/users/', userController);

module.exports = router;
