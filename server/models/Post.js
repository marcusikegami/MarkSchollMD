const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Post = model('Post', postSchema);

module.exports = Post;