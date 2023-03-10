import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { UPLOAD_FILE } from '../utils/mutations';
import auth from '../utils/auth';

const CreatePost = (user) => {
    
    
    const [formState, setFormState] = useState({ header: '', body: [], category: '', image: '', imagecaption: '', video: '', urls: [] });
    const [createPost, { error }] = useMutation(ADD_POST);

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFileChange = async (event) => {
        let confirm = window.confirm('Are you sure you want to upload this file?');
        if(confirm) {
            const file = event.target.files[0];
            formState.pdfname = file.name;
            console.log(file);
            if(!file) return;
            try {
                const { data } = await uploadFile({ variables: { file } })
                formState.urls = formState.urls.concat(data.singleUpload.url);
                console.log(formState.urls);
            } catch (err) {
                console.error(err);
                window.alert(`${err}`);
            };
            
        }
    };

    let urlValidate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
                let paragraphsArray = gatherParagraphData();
                console.log(paragraphsArray);
                try {
                     const { data } = await createPost({
                        variables: { ...formState,
                        body: paragraphsArray}
                    });
        
                    window.location.href = `/post/${data.addPost._id}`;
                } catch (err) {
                    console.error(error);
                    window.alert(`${err}`);
               }
            return;
    };

    const addParagraph = () => {
        let paragraphNumber = document.getElementById('paragraphs-form').childElementCount + 1;
        let form = document.getElementById('paragraphs-form');

        let paragraph = document.createElement('div');
            paragraph.id =`${paragraphNumber}`;
            paragraph.className = 'post-form paragraph';
            

        let headerinput = document.createElement('input');
            headerinput.type = 'text';
            headerinput.name = 'paragraph-header';
            headerinput.className = 'form-input';
            headerinput.placeholder = 'Paragraph Header'
            headerinput.onChange = function() {
                console.log(paragraph.value);
            }

        let imageinput = document.createElement('input');
            imageinput.type = 'text';
            imageinput.name = 'paragraph-image';
            imageinput.className = 'form-input';
            imageinput.placeholder = 'Image URL'

        let imagecaptioninput = document.createElement('input');
            imagecaptioninput.type = 'text';
            imagecaptioninput.name = 'paragraph-imagecaption';
            imagecaptioninput.className = 'form-input';
            imagecaptioninput.placeholder = 'Image Caption'

        let textarea = document.createElement('textarea');
            textarea.name = 'paragraph-body';
            textarea.className = 'form-textarea';
            textarea.placeholder = 'Body Text'
        
        let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.innerText = 'Delete Paragraph';
            deleteButton.setAttribute('paragraph-id', `${paragraphNumber}`);
            deleteButton.value = 'button';
            deleteButton.addEventListener('click', (event) =>{
                event.preventDefault();
                console.log(event);
                const element = document.getElementById(event.target.parentElement.id);
                element.remove();
            });
        paragraph.appendChild(headerinput);
        paragraph.appendChild(imageinput);
        paragraph.appendChild(imagecaptioninput);
        paragraph.appendChild(textarea);
        paragraph.appendChild(deleteButton);
        form.appendChild(paragraph);
    };

    
    const gatherParagraphData = () => {
        let paragraphsArray = [];
        let paragraphs = document.getElementById('paragraphs-form').childNodes;
        let arr = [...paragraphs];
        arr.map(element => {
            let obj = {}
            let contents = element.childNodes;
            obj.header = contents[0].value;
            obj.image = contents[1].value;
            obj.imagecaption = contents[2].value;
            obj.body = contents[3].value;
            paragraphsArray.push(obj);
        });
        console.log(paragraphsArray);
        return paragraphsArray;
    }
        if(auth.loggedIn()) { return (
        <main id='main'>
            <div className='form-container'>
                <form className='post-form'>
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

                    <h2>Video Link</h2>
                <input
                        className='form-input'
                        placeholder='Video Link'
                        name='video'
                        type='file'
                        id='post-video'
                        value={formState.video}
                        onChange={handleFileChange}
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
                    {((formState.image !== "" || null) && !formState.image.match(urlValidate)) && <p id="invalid">URL IS INVALID</p>}
                    <h2>Image Caption</h2>
                <input
                        className='form-input'
                        placeholder='Image Caption'
                        name='imagecaption'
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
                </form>
                    <h2>Body</h2>
                <form className='post-form' id='paragraphs-form'>
                    <div id="1" class="post-form paragraph">
                        <input 
                            type="text" 
                            name="paragraph-header" 
                            class="form-input" 
                            placeholder="Paragraph Header"/>
                        <input 
                            type="text" 
                            name="paragraph-image" 
                            class="form-input" 
                            placeholder="Image URL"/>
                        <input 
                            type="text" 
                            name="paragraph-imagecaption" 
                            class="form-input" 
                            placeholder="Image Caption"/>
                        <textarea
                             name="paragraph-body" 
                             class="form-textarea" 
                             placeholder="Body Text">
                        </textarea>
                        <button type="button" onClick={() => document.querySelectorAll("[data-tag='1']").reset()} value="reset">Clear Paragraph</button>
                    </div>
                </form>
                    <button type='button' onClick={addParagraph}>Add</button>
                    <button className="button" type='submit' onClick={handleFormSubmit}>Create Post</button>
            </div>
        </main>
    )} else {
    window.location.assign('/');
} 
};

export default CreatePost;

// File upload,
