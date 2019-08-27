const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userModel = require('../models/user');
const paramsValidatorMidd = require('../middlewares/paramsValidator');

const createUser = async (req, res, next) => {
    try {
        const { name, avatar } = req.body;
        const user = await new userModel({ name, avatar }).save();
        res.send(user);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

const getUsers = async (req, res, next) => {
    const users = await userModel.find();
    res.send(users);
};

// routes

router.get(
    '/',
    getUsers
);

router.post(
    '/',
    [check('name').matches(/^[a-z ]+$/i), check('avatar').isURL()],
    paramsValidatorMidd.validateParams,
    createUser
);

module.exports = router;
