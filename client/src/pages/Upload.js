import { useMutation } from '@apollo/client';
import { useState } from 'react';
import auth from '../utils/auth';
import { UPLOAD_FILE, ADD_PDF } from '../utils/mutations';

const UploadForm = () => {
    const [formState, setFormState] = useState({ pdfname: '', url: '', category: 'Select Category'});
    const [addPdf] = useMutation(ADD_PDF, {
        onCompleted: data => console.log(data)
    });
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });

    const handleFileChange = event => {
        let confirm = window.confirm('Are you sure you want to upload this file?');
        if(confirm) {
            const file = event.target.files[0];
            console.log(file);
            if(!file) return;
            uploadFile({ variables: { file } })
        }
    }

    const handleChange = event => {
        console.log(event.target);
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if(formState.category === '' || formState.category === 'Select Category') {
            window.alert('Please select a category');
            return;
        }
                try {
                     const { data } = await addPdf({ variables: { ...formState} });
                     window.alert('Completed');
                     setFormState({ pdfname: '', url: '', category: ''});
                } catch (err) {
                    console.error(err);
                    window.alert(`${err}`);
               }
            return;
    };

    if (auth.loggedIn()) {
        return (
            <div id='upload-container'>
                <h1>Upload File</h1>
                <input type="file" onChange={handleFileChange}/>

                <h2>Link PDF</h2>
                <form onSubmit={handleFormSubmit}>
                    <h2>PDF Name</h2>
                    <input
                        className='form-input'
                        placeholder='Filename'
                        name='pdfname'
                        type='text'
                        id='post-filename'
                        value={formState.pdfname}
                        onChange={handleChange}
                        onBlur={() => {
                            if(formState.pdfname === "") {
                                window.alert('Filename is a required field');
                            }
                        }}
                    />
                    <h2>PDF Link</h2>
                    <input
                        className='form-input'
                        placeholder='Google Drive URL'
                        name='url'
                        type='text'
                        id='post-url'
                        value={formState.url}
                        onChange={handleChange}
                        onBlur={() => {
                            if(formState.url === "") {
                                window.alert('URL is a required field');
                            }
                        }}
                    />
                    <h2>Category</h2>
                    <select
                        className='form-select'
                        placeholder='PDF Category'
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
                        <option value='Select Category'>Select Category</option>
                        <option value='Info for Patients'>Info for Patients</option>
                        <option value='Info for Physical Therapists'>Info for Physical Therapists</option>
                    </select>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    } else {
        window.location.assign('/');
    }

}

export default UploadForm;