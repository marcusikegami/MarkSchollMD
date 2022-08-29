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