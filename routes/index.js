require('../mongo/schema');

const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// hello
router.get('/', ({ res }) => res.send('peermedical-api available'));

// users
router.post('/users', (req, res) => {
    const UserModel = mongoose.model('User');
    let newUser = new UserModel({
        name: 'Gary',
        avatar:
            'https://scontent.faep11-1.fna.fbcdn.net/v/t1.0-9/18341879_768394413320390_6488937265712347698_n.jpg',
    });
    newUser.save().then(user => console.log('savedAs', user));

    res.send('OK');
});

module.exports = router;
