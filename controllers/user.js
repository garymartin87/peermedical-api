const express = require('express');
const router = express.Router();

const userModel = require('../models/user');

const createUser = async (req, res, next) => {
    const { name, avatar } = req.body;

    let newUser = new userModel({ name, avatar });
    newUser.save().then(user => console.log('savedAs', user));

    res.send('OK');
};

router.post('/', createUser);

module.exports = router;
