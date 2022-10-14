import { useQuery } from '@apollo/client';
import { QUERY_UPLOADS } from '../utils/queries';
import PostPreview from '../components/PostPreview';

const PtInfo = () => {
    let { data } = useQuery(QUERY_UPLOADS);
    let uploads = data?.uploads || [];

    return (
        <main>
            <div id='uploads-wrapper'>
            {uploads.map(upload => {
                    return (
                        <div key={upload.createdAt} className='upload'>
                            <a href={upload.url} className='upload-link'>{upload.filename}</a>
                            <p className='upload-date'>{upload.createdAt}</p>
                        </div>
                    )
                })}
            </div>
        </main>
    )
};

export default PtInfo;