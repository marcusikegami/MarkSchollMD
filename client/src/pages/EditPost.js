import auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import PostForm from '../components/PostForm';
import { QUERY_POST } from '../utils/queries';

const EditPost = (props) => {

    const { _id: postId } = useParams();

    if(!auth.loggedIn()) {
        window.location.assign('/');
    }
    
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { _id: postId },
    });

    const post = data?.post;

        if(auth.loggedIn() && !loading) { 
        return (
        <main id='main'>
            <div className='form-container'>
            <button className="button" onClick={() => {window.history.back()}}>Back</button>
                <PostForm post={post} />
            </div>
        </main>
    ) } else {
        return <div>Loading...</div>
    }
}

export default EditPost;