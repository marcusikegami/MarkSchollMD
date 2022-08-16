import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';

import auth from '../utils/auth';

const CreatePost = (props) => {
    if(!auth.loggedIn()) {
        window.location.assign('/');
    }
    const [formState, setFormState] = useState({ header: '', body: '', category: '', video: '' });
    const [createPost, { error }] = useMutation(ADD_POST);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
             await createPost({
                variables: { ...formState }
            });

        } catch (err) {
            console.error(error);
;       }

        setFormState({
            header: '', 
            body: '', 
            category: '', 
            video: '' 
        })
    };


    if(auth.loggedIn()) { 
        return (
        <main>
            <div>
                <form id='post-form' onSubmit={handleFormSubmit}>
                <input
                        className='form-input'
                        placeholder='Header'
                        name='header'
                        type='text'
                        id='post-header'
                        value={formState.header}
                        onChange={handleChange}
                    />
                <textarea
                        className='form-textarea'
                        placeholder='Body Text'
                        name='body'
                        type='text'
                        id='post-body'
                        value={formState.body}
                        onChange={handleChange}
                    />
                <input
                        className='form-input'
                        placeholder='Video Link'
                        name='video'
                        type='text'
                        id='post-video'
                        value={formState.username}
                        onChange={handleChange}
                    />
                <select
                        className='form-select'
                        placeholder='Post Category'
                        name='category'
                        type='select'
                        id='post-category'
                        value={formState.category}
                        onChange={handleChange}
                    >
                        <option value='Patient Education'>Patient Education</option>
                        <option value='Information about surgery with Dr. Scholl'>Information about surgery with Dr. Scholl</option>
                        <option value='Knee'>Knee</option>
                        <option value='Shoulder'>Shoulder</option>
                        <option value='Information for Physical Therapists'>Information for Physical Therapists</option>
                        <option value='News and Updates'>News and Updates</option>
                    </select>
                    <button type='submit'>Create Post</button>
                </form>
            </div>
        </main>
    ) } else {
        window.location.assign('/');
    }
}

export default CreatePost;