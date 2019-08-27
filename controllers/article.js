const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const articleModel = require('../models/article');
const userModel = require('../models/user');
const paramsValidatorMidd = require('../middlewares/paramsValidator');

const createArticle = async (req, res, next) => {
    try {
        const { userId, title, text, tags } = req.body;

        // check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            const err = new Error('User does not exist');
            err.status = 422;
            return next(err);
        }

        const articleData = {
            userId,
            title,
            text,
            tags,
        };
        const article = await new articleModel(articleData).save();

        res.send(article);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

const getArticles = async (req, res, next) => {
    const articles = await articleModel.find();
    res.send(articles);
};

// routes

router.get('/', getArticles);

router.post(
    '/',
    [
        check('userId').matches(/^[0-9a-fA-F]{24}$/),
        check('title').isAscii(),
        check('text').isAscii(),
    ],
    paramsValidatorMidd.validateParams,
    createArticle
);

module.exports = router;
