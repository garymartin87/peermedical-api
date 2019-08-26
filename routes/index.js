const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authorizationMidd = require('../middlewares/authorization');

// index
router.get('/', ({ res }) => res.send('peermedical-api available'));

// authorization token required
router.use(authorizationMidd.checkAuthorization);

// users
router.use('/users/', userController);

// error handler
router.use(function(err, req, res, next) {
    if (err.status === 500) {
        console.error(err);
    }

    res.status(err.status || 500);
    res.send({
        status: err.status,
        message:
            err.status === 500 ? 'Can not process the request' : err.message,
    });
});

module.exports = router;
