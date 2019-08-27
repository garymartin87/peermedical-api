const articleModel = require('../models/article');

const articleExists = async (req, res, next) => {
    const err = new Error('Article does not exist.');
    err.status = 404;

    const id = req.params.id;
    if (!id) {
        return next(err);
    }

    const article = await articleModel.findById(id);
    if (!article) {
        return next(err);
    }

    next();
};

module.exports = {
    articleExists,
};
