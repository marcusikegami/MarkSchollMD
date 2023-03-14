import React, { useState } from 'react';
import { UPLOAD_FILE } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const BodyParagraph = ({id, header, image, imagecaption, body}) => {
    const [url, setUrl] = useState('');
    const [uploadFile, { loading }] = useMutation(UPLOAD_FILE, {
        onCompleted: data => setUrl(data.singleUpload.url)
    });

    const handleFileChange = async (event) => {
        let confirm = window.confirm('Are you sure you want to upload this file?');
        debugger;
        if(confirm) {
            console.log(event.target);
            const file = event.target.files[0];
            console.log(file);
            if(!file) return;
            try {
                const { data } = await uploadFile({ variables: { file } })
            } catch (err) {
                console.error(err);
                window.alert(`${err}`);
            };
            
        }
    };

    return (
        <div key={id} className="post-form paragraph">
            <input 
                type="text" 
                name="paragraph-header" 
                className="form-input" 
                placeholder="Paragraph Header"
                defaultValue={header}/>
            <input 
                type="file"
                name="paragraph-image" 
                className="form-upload" 
                onChange={handleFileChange}/>
            <p>{url ? url : image}</p>
            <input 
                type="text" 
                name="paragraph-imagecaption" 
                className="form-input" 
                placeholder="Image Caption"
                defaultValue={imagecaption}/>
            <textarea
                 name="paragraph-body" 
                 className="form-textarea" 
                 placeholder="Body Text"
                 defaultValue={body}>
            </textarea>
        </div>
    )
}

export default BodyParagraph;