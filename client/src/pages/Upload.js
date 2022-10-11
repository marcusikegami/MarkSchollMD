import { useMutation } from '@apollo/client';

import { UPLOAD_FILE } from '../utils/mutations';

const UploadForm = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });

    const handleFileChange = event => {
        const file = event.target.files[0];
        console.log(file);
        if(!file) return;
        uploadFile({ variables: { file } })
    }

    return (
        <div>
            <h1>Upload File</h1>
            <input type="file" onChange={handleFileChange}/>
        </div>
    )

}

export default UploadForm;