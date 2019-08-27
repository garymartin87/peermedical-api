const express = require('express');
const router = express.Router();
const { check, validator } = require('express-validator');

const articleModel = require('../models/article');
const userModel = require('../models/user');
const paramsValidatorMidd = require('../middlewares/paramsValidator');
const articleMidd = require('../middlewares/article');

// handlers
const createArticle = async (req, res, next) => {
    try {
        // get params
        const { userId, title, text, tags } = req.body;

        // check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            const err = new Error('User does not exist');
            err.status = 422;
            return next(err);
        }

        // create article
        const articleData = {
            userId,
            title,
            text,
            tags,
        };
        const article = await new articleModel(articleData).save();

        // send response
        res.send(article);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

const getArticles = async (req, res, next) => {
    const { tags } = req.query;

    let filters = {};
    if (tags) {
        filters.tags = { $all: tags };
    }

    const articles = await articleModel.find(filters);
    res.send(articles);
};

const updateArticle = async (req, res, next) => {
    try {
        // get params
        const { id } = req.params;
        const { userId, title, text, tags } = req.body;

        // check if user exists
        if (userId) {
            const user = await userModel.findById(userId);
            if (!user) {
                const err = new Error('User does not exist');
                err.status = 422;
                return next(err);
            }
        }

        // update article
        const article = await articleModel.findById(id);
        article.userId = userId;
        article.title = title;
        article.text = text;
        article.tags = tags;
        article.save();

        // send response
        res.send(article);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        // get params
        const { id } = req.params;
        const { userId, title, text, tags } = req.body;

        // delete article
        await articleModel.deleteOne({ _id: id });

        // send response
        res.send();
    } catch (err) {
        err.status = 500;
        return next(err);
    }
};

// routes
router.get('/', getArticles);

router.post(
    '/',
    [
        check('userId').matches(/^[0-9a-fA-F]{24}$/),
        check('title').isAscii(),
        check('text').isAscii(),
        check('tags.*').isLength({ min: 1 }),
    ],
    paramsValidatorMidd.validateParams,
    createArticle
);

router.patch(
    '/:id',
    [
        check('id').matches(/^[0-9a-fA-F]{24}$/),
        check('userId')
            .optional()
            .matches(/^[0-9a-fA-F]{24}$/),
        check('title').isAscii(),
        check('text').isAscii(),
        check('tags.*').isLength({ min: 1 }),
    ],
    paramsValidatorMidd.validateParams,
    articleMidd.articleExists,
    updateArticle
);

router.delete(
    '/:id',
    [check('id').matches(/^[0-9a-fA-F]{24}$/)],
    paramsValidatorMidd.validateParams,
    articleMidd.articleExists,
    deleteArticle
);

module.exports = router;
