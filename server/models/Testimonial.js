const { Schema, model } = require('mongoose');

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

const Testimonial = model('Testimonial', testimonialSchema);

module.exports = Testimonial;