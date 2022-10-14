import { useQuery } from '@apollo/client';
import { QUERY_UPLOADS } from '../utils/queries';
import PostPreview from '../components/PostPreview';

const PtInfo = () => {
    let { data } = useQuery(QUERY_UPLOADS);
    let uploads = data?.uploads || [];

    return (
        <main>
            <div id='uploads-wrapper'>
            {uploads.map(post => {
                    return (
                        <a href={uploads.url} className='upload'></a>
                    )
                })};
            </div>
        </main>
    )
};

export default PtInfo;