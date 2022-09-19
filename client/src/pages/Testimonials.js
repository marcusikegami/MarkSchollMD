import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TESTIMONIALS } from '../utils/queries';
import { POST_TESTIMONIAL } from '../utils/mutations';

const Testimonials = () => {
    const [formState, setFormState] = useState({ body: '', name: '' })
    const [postTestimonial, { error }] = useMutation(POST_TESTIMONIAL);
    const { data } = useQuery(QUERY_TESTIMONIALS);
    const testimonials = data?.testimonials;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await postTestimonial({
                variables: { ...formState },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            body: '',
            name: ''
        });
    };

    return (
        <main>
            <div id="testimonial-form">
                <h1>Have feedback for Dr. Scholl?</h1>
                <form onSubmit={handleFormSubmit}>
                    <input
                        className='form-input'
                        placeholder='Testimonial'
                        name='body'
                        type='text'
                        value={formState.body}
                        onChange={handleChange}
                    />
                    <input
                        className='form-input'
                        placeholder='Name'
                        name='name'
                        type='text'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <button type='submit'>Submit</button>
                </form>

                {error && <div>Submission Failed: Try again later</div>}
            </div>
            <div id="testimonials-wrapper">
                {testimonials?.map(element => {
                    if(element.approval) {
                        return (
                            <div key={element._id} className="testimonial">
                                <p>"{element.body}"</p>
                                <h3>–{element.name}</h3>
                            </div>
                        );
                    } 
                    return null;
                })}
            </div>
        </main>
    )
};

export default Testimonials;