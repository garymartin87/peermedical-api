const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    { collection: 'users' }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
