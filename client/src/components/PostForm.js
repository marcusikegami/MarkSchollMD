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
         let paragraphsArray = gatherParagraphData();
         try {
              const { data } = await editPost({
                 variables: { ...formState, body: paragraphsArray, _id: _id } 
             });
              window.location.href = `/post/${data.editPost._id}`;
         } catch (err) {
             console.error(error);
         }
        };
        
        let urlValidate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        
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
            const paragraphsArray = [];
            let paragraphs = document.getElementById('paragraphs-form');
            console.log(paragraphs);
            let paragraph = {};
                paragraph.header = paragraphs[0].value;
                paragraph.image = paragraphs[0 + 1].value;
                paragraph.imagecaption = paragraphs[0 + 2].value;
                paragraph.body = paragraphs[0 + 3].value;
                paragraphsArray.push(paragraph);
            for (let i = 4; i < paragraphs.length -1; i = i + 5) {
                let paragraph = {};
                paragraph.header = paragraphs[i].value;
                paragraph.image = paragraphs[i + 1].value;
                paragraph.imagecaption = paragraphs[i + 2].value;
                paragraph.body = paragraphs[i + 3].value;
                paragraphsArray.push(paragraph);
            }
            setFormState({
                ...formState,
                body: paragraphsArray
            });
            console.log(formState);
            return paragraphsArray;
        }

    return (
        <div className='form-container'>
                <form className='post-form' onSubmit={handleFormSubmit}>
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
                    {formState.body.map((paragraph, index) => {
                        let id = (index + 1).toString();
                        return (
                    <div id={id} key={id} className="post-form paragraph">
                        <input 
                            type="text" 
                            name="paragraph-header" 
                            className="form-input" 
                            placeholder="Paragraph Header"
                            defaultValue={paragraph.header}/>
                        <input 
                            type="text" 
                            name="paragraph-image" 
                            className="form-input" 
                            placeholder="Image URL"
                            defaultValue={paragraph.image}/>
                        <input 
                            type="text" 
                            name="paragraph-imagecaption" 
                            className="form-input" 
                            placeholder="Image Caption"
                            defaultValue={paragraph.imagecaption}/>
                        <textarea
                             name="paragraph-body" 
                             className="form-textarea" 
                             placeholder="Body Text"
                             defaultValue={paragraph.body}>
                        </textarea>
                    </div>
                        )
                    })}
                </form>
                    <button type='button' onClick={addParagraph}>Add New Body Paragraph</button>
                    <button className="button" type='submit' onClick={handleFormSubmit}>Save Post</button>
            </div>
    )
};

export default PostForm;