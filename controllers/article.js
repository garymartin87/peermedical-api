const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

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

const patchArticle = async (req, res, next) => {
    // get params
    const { id } = req.params;

    // check if user exists
    const { userId } = req.body;
    if (userId) {
        const user = await userModel.findById(userId);
        if (!user) {
            const err = new Error('User does not exist');
            err.status = 422;
            return next(err);
        }
    }

    // update article
    const result = await articleModel.updateOne(
        { _id: id },
        { $set: req.body },
        { new: true }
    );

    // send response
    const article = await articleModel.findById(id);
    res.send(article);
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
        check('tags').custom(value => {
            return Array.isArray(value) && value.length > 0;
        }),
        check('tags.*').isLength({ min: 1 }),
    ],
    paramsValidatorMidd.validateParams,
    createArticle
);

router.put(
    '/:id',
    [
        check('id').matches(/^[0-9a-fA-F]{24}$/),
        check('userId').matches(/^[0-9a-fA-F]{24}$/),
        check('title').isAscii(),
        check('text').isAscii(),
        check('tags').custom(value => {
            return Array.isArray(value) && value.length > 0;
        }),
        check('tags.*').isLength({ min: 1 }),
    ],
    paramsValidatorMidd.validateParams,
    articleMidd.articleExists,
    updateArticle
);

router.patch(
    '/:id',
    [
        check('id')
            .optional()
            .matches(/^[0-9a-fA-F]{24}$/),
        check('userId')
            .optional()
            .matches(/^[0-9a-fA-F]{24}$/),
        check('title')
            .optional()
            .isAscii(),
        check('text')
            .optional()
            .isAscii(),
        check('tags')
            .optional()
            .custom(value => {
                return Array.isArray(value) && value.length > 0;
            }),
        check('tags.*')
            .optional()
            .isLength({ min: 1 }),
    ],
    paramsValidatorMidd.validateParams,
    articleMidd.articleExists,
    patchArticle
);

router.delete(
    '/:id',
    [check('id').matches(/^[0-9a-fA-F]{24}$/)],
    paramsValidatorMidd.validateParams,
    articleMidd.articleExists,
    deleteArticle
);

module.exports = router;
