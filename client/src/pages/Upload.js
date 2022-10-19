import { useMutation } from '@apollo/client';
import { useState } from 'react';
import auth from '../utils/auth';
import { UPLOAD_FILE, ADD_PDF } from '../utils/mutations';

const UploadForm = () => {
    const [formState, setFormState] = useState({ pdfname: '', url: ''});
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
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
                try {
                     const { data } = await addPdf({ variables: { ...formState} });
                     window.alert('Completed');
                     setFormState({ pdfname: '', url: ''});
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
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    } else {
        window.location.assign('/');
    }

}

export default UploadForm;