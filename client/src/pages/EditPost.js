import auth from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import PostForm from '../components/PostForm';
import { QUERY_POST } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';
const EditPost = (props) => {
    const [removePost] = useMutation(REMOVE_POST);

    const { _id: postId } = useParams();

    if(!auth.loggedIn()) {
        window.location.assign('/');
    }
    
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { _id: postId },
    });
    const handleDeletePost = () => {
            const confirmation = window.confirm('Are you sure you want to remove this post?');
            if(confirmation) {
                try {
                    removePost({variables: { _id: postId}});
                    window.location.href = `/`;
            } catch (err) {
                console.error(err);
            }
        }
        return;
    };
    const post = data?.post;
    console.log(post);

        if(auth.loggedIn() && !loading) { 
        return (
        <main id='main'>
            <button className="button" onClick={() => {window.history.back()}}>Back</button>
                <PostForm post={post} />
            <button className="button" onClick={() => handleDeletePost()}>Delete</button>
        </main>
    ) } else {
        return <div>Loading...</div>
    }
}

export default EditPost;