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

    let urlValidate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let urlValidate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        if (formState.video.match(urlValidate) || formState.video === '') {
            console.log(formState);
            try {
                 await createPost({
                    variables: { ...formState }
                });
    
            } catch (err) {
                console.error(error);
                window.alert(`${err}, A category is required.`);
           }
        } else {
            window.alert('submitted');
        }
        window.location.href = `/`;
    };


    if(auth.loggedIn()) { 
        return (
        <main>
            <div className='form-container'>
                <form id='post-form' onSubmit={handleFormSubmit}>
                <input
                        className='form-input'
                        placeholder='Header'
                        name='header'
                        type='text'
                        id='post-header'
                        value={formState.header}
                        onChange={handleChange}
                        onBlur={() => {
                            if(formState.header === "") {
                                window.alert('Header is a required field');
                            }
                        }}
                    />
                <textarea
                        className='form-textarea'
                        placeholder='Body Text'
                        name='body'
                        id='post-body'
                        value={formState.body}
                        onChange={handleChange}
                        onBlur={() => {
                            if(formState.body === "") {
                                window.alert('Body is a required field');
                            }
                        }}
                    />
                <input
                        className='form-input'
                        placeholder='Video Link'
                        name='video'
                        type='text'
                        id='post-video'
                        value={formState.video}
                        onChange={handleChange}
                        // onBlur={() => {
                        //     if()
                        // }}
                    />
                    {(formState.video !== "" && !formState.video.match(urlValidate)) && <p id="invalid">URL IS INVALID</p>}
                <select
                        className='form-select'
                        placeholder='Post Category'
                        name='category'
                        type='select'
                        id='post-category'
                        value={formState.category}
                        onChange={handleChange}
                        onBlur={() => {
                            if(formState.category === "") {
                                window.alert('Category is a required field');
                            }
                        }}
                    >
                        <option value=''>Post Category</option>
                        <option value='Patient Education'>Patient Education</option>
                        <option value='Information about surgery with Dr. Scholl'>Information about surgery with Dr. Scholl</option>
                        <option value='Knee'>Knee</option>
                        <option value='Shoulder'>Shoulder</option>
                        <option value='Information for Physical Therapists'>Information for Physical Therapists</option>
                        <option value='News and Updates'>News and Updates</option>
                    </select>
                    <button className="button" type='submit'>Create Post</button>
                </form>
            </div>
        </main>
    ) } else {
        window.location.assign('/');
    }
}

export default CreatePost;