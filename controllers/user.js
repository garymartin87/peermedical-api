const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

const userModel = require('../models/user');
const paramsValidatorMidd = require('../middlewares/paramsValidator');

const createUser = async (req, res, next) => {
    try {
        const { name, avatar } = req.body;
        const newUser = await new userModel({ name, avatar }).save();
        res.send(newUser);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

router.post(
    '/',
    [check('name').matches(/^[a-z ]+$/i), check('avatar').isURL()],
    paramsValidatorMidd.validateParams,
    createUser
);

module.exports = router;
