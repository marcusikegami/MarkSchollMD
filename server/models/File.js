import mongoose from 'mongoose';
const { Schema } = mongoose;
import { dateFormat } from '../utils/dateFormat.js';

const fileSchema = new Schema(
    {
        filename: {
            type: String,
            required: true
        },
        url: {
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

const File = mongoose.model('File', fileSchema);

export default File;