import mongoose from 'mongoose';
const { Schema } = mongoose;
import { dateFormat } from '../utils/dateFormat.js';

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
        image: {
            type: String,
            required: false
        },
        imagecaption: {
            type: String,
            required: false
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

const Post = mongoose.model('Post', postSchema);

export default Post;