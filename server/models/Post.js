const { Schema, model } = require('mongoose');


const postSchema = new Schema(
    {
        header: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: true
        }
    },
    {

    }
);

const Post = model('Post', postSchema);

module.exports = Post;