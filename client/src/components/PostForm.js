import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_POST } from '../utils/mutations';

const PostForm = ({post}) => {
    const { header, body, image, imagecaption, video, category, _id } = post ;

     const [formState, setFormState] = useState({ _id: _id, header: header, body: body, category: category, image: image, imagecaption: imagecaption, video: video });
    //  const [formState, setFormState] = useState({ header: '', body: '', category: '', video: '' });
     const [editPost, { error }] = useMutation(EDIT_POST);
 
     const handleChange = (event) => {
         const { name, value } = event.target;
         setFormState({
             ...formState,
             [name]: value,
         });
     };
 
     const handleFormSubmit = async (event) => {
         event.preventDefault();
         try {
              const { data } = await editPost({
                 variables: { _id: _id, ...formState,  }
             });
              window.location.href = `/post/${data.editPost._id}`;
         } catch (err) {
             console.error(error);
         }
        };
        let urlValidate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return (
        <form id='post-form' onSubmit={handleFormSubmit}>
                <h2>Header</h2>
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
                    <h2>Body</h2>
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
                    <h2>Video Link</h2>
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
                    <h2>Thumbnail/Image URL</h2>
                <input
                        className='form-input'
                        placeholder='Image Link'
                        name='image'
                        type='text'
                        id='post-image'
                        value={formState.image}
                        onChange={handleChange}
                        // onBlur={() => {
                        //     if()
                        // }}
                    />
                    {(formState.image !== "" && !formState.image.match(urlValidate)) && <p id="invalid">URL IS INVALID</p>}
                    <h2>Image Caption</h2>
                <input
                        className='form-input'
                        placeholder='Image Caption'
                        name='image-caption'
                        type='text'
                        id='post-image-caption'
                        value={formState.imagecaption}
                        onChange={handleChange}
                    />
                    <h2>Post Category</h2>
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
                        {/* <option value='Knee'>Knee</option>
                        <option value='Shoulder'>Shoulder</option> */}
                        <option value='Information for Physical Therapists'>Information for Physical Therapists</option>
                        <option value='News and Updates'>News and Updates</option>
                    </select>
                    <button className="button" type='submit'>Create Post</button>
                </form>
    )
};

export default PostForm;