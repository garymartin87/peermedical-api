const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const userModel = require('../models/user');
const paramsValidatorMidd = require('../middlewares/paramsValidator');

const createUser = async (req, res, next) => {
    const { name, avatar } = req.body;

    let newUser = new userModel({ name, avatar });
    newUser.save().then(user => console.log('savedAs', user));

    res.send('OK');
};

router.post(
    '/',
    [check('name').matches(/^[a-z ]+$/i), check('avatar').isURL()],
    paramsValidatorMidd.validateParams,
    createUser
);

module.exports = router;
