const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        text: { type: String, required: true },
        tags: [String],
    },
    { collection: 'articles', versionKey: false }
);

const articleModel = mongoose.model('Article', articleSchema);

module.exports = articleModel;
