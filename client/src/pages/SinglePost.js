import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import auth from '../utils/auth';
import { Link } from 'react-router-dom';

const SinglePost = () => {

    const { _id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { _id: postId }
    });

    const post = data?.post;
    console.log(post);
    if(loading) {
        return (
            <div>Loading...</div>
        )
    } else {
    return (
        <main>
            <div id='post-wrapper'>
                <div key={post._id} className="full">
                    {auth.loggedIn() && (<Link className="button" to={`/edit-post/${post._id}`}>Edit Post</Link>)}
                    <h2 className="post-title">{post.header}</h2>
                    <p className="post-date">{post.createdAt}</p>
                    { post.image && ( <img src={post.image} alt={post.imagecaption} className="post-thumbnail"/> )}
                    { post.video && (<iframe title={post.title} className="post-iframe" src={post.video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)}
                    { post.body.map(paragraph => {
                        return (
                            <div className="paragraph">
                                <h3 className='paragraph-header'>{paragraph.header}</h3>
                                <p className="post-body"><img className="post-image" src={paragraph.image} alt={paragraph.imagecaption} />{paragraph.body}</p>
                            </div>
                        )
                    })}
                    
                    <p className="post-category">{post.category}</p>
                </div>
            </div>
        </main>
    )}
}

export default SinglePost;