import mongoose from 'mongoose';
const { Schema } = mongoose;
import { dateFormat } from '../utils/dateFormat.js';

const pdfSchema = new Schema(
    {
        pdfname: {
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

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf;