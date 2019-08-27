const checkAuthorization = async (req, res, next) => {
    const token = req.headers['authorization']; // Express headers are auto converted to lowercase
    if (!token) {
        const err = new Error('Required token does not exist');
        err.status = 401;
        return next(err);
    }

    const requiredToken = process.env.API_TOKEN;
    if (token !== requiredToken) {
        const err = new Error('Token is not valid');
        err.status = 401;
        return next(err);
    }

    next();
};

module.exports = {
    checkAuthorization,
};
