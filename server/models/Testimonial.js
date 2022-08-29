import mongoose from "mongoose";
const { Schema } = mongoose;


const testimonialSchema = new Schema( 
    {
        body: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true 
        },
        approval: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {

    }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;