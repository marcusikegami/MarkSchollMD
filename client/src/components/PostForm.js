import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_POST } from '../utils/mutations';

const PostForm = ({post}) => {
    
    const { header, body, video, category, _id } = post ;

     const [formState, setFormState] = useState({ _id: _id, header: header, body: body, category: category, video: video });
    //  const [formState, setFormState] = useState({ header: '', body: '', category: '', video: '' });
     const [editPost, { error }] = useMutation(EDIT_POST);
 
     const handleChange = (event) => {
         const { name, value } = event.target;
         console.log(post);
         setFormState({
             ...formState,
             [name]: value,
         });
     };
 
     const handleFormSubmit = async (event) => {
         event.preventDefault();
         try {
              const { data } = await editPost({
                 variables: { ...formState,  }
             });
              window.location.href = `/post/${data.editPost._id}`;
         } catch (err) {
             console.error(error);
         }
        };
    
    return (
        <form id='post-form' onSubmit={handleFormSubmit}>
            <h3>Header</h3>
                <input
                        className='form-input'
                        placeholder='Header'
                        name='header'
                        type='text'
                        id='post-header'
                        value={formState.header}
                        onChange={handleChange}
                    />
                    <h3>Body</h3>
                <textarea
                        className='form-textarea'
                        placeholder='Body Text'
                        name='body'
                        type='text'
                        id='post-body'
                        value={formState.body}
                        onChange={handleChange}
                    />
                    <h3>Video Link</h3>
                <input
                        className='form-input'
                        placeholder='Video Link'
                        name='video'
                        type='text'
                        id='post-video'
                        value={formState.video}
                        onChange={handleChange}
                    />
                    <h3>Category</h3>
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
                        <option value='Testimonials'>Testimonials</option>
                    </select>
                    <button className="button" type='submit'>Save Post</button>
                </form>
    )
};

export default PostForm;