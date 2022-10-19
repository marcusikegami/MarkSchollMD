import { useQuery, useMutation } from '@apollo/client';
import { QUERY_UPLOADS, QUERY_PDFS } from '../utils/queries';
import { REMOVE_FILE } from '../utils/mutations';
import PostPreview from '../components/PostPreview';
import Auth from '../utils/auth';
import PdfLinks from '../components/PdfLinks';
const PtInfo = () => {
    let { data } = useQuery(QUERY_UPLOADS);
    let [removeUpload] = useMutation(REMOVE_FILE);
    let uploads = data?.uploads || [];

   

    const handleDeleteUpload = async (url) => {
        try {
             const { data } = await removeUpload({
                variables: { url: url }
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
        return;
    };

    return (
        <main>
            <div id='uploads-wrapper'>
            {uploads.map(upload => {
                let Url = upload.url.split('public')[1];
                console.log(Url);
                    return (
                        
                        <div key={upload.url} className='upload'>
                            {Auth.loggedIn() && (
                                <button onClick={() => {return handleDeleteUpload(upload.url)}}>Delete File</button>
                            )}
                            {/* <a href={Url} download className='upload-link'>{upload.filename}</a> */}
                            <button onClick={() => window.open(Url)}>{upload.filename}</button>
                            <p className='upload-date'>{upload.createdAt}</p>
                        </div>
                    )
                })}
            </div>
            <PdfLinks />
        </main>
    )
};

export default PtInfo;