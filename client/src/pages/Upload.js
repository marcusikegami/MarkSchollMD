import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { UPLOAD_FILE } from '../utils/mutations';

const UploadForm = () => {
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
    if (auth.loggedIn()) {
        return (
            <div id='upload-container'>
                <h1>Upload File</h1>
                <input type="file" onChange={handleFileChange}/>
            </div>
        )
    } else {
        window.location.assign('/');
    }

}

export default UploadForm;