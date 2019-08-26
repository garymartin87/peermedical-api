const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        avatar: String,
    },
    { collection: 'users' }
);

const articleSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        title: { type: String, required: true },
        text: { type: String, required: true },
        tags: [String],
    },
    { collection: 'articles' }
);

mongoose.model('User', userSchema);
mongoose.model('Article', articleSchema);
