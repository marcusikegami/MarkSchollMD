import auth from "../utils/auth";
import { Link } from 'react-router-dom';

const Post = ({post}) => {
    console.log(post);
    return (
        <div key={post._id} className="post">
            {auth.loggedIn() && (<Link to={`/edit-post/${post._id}`}>Edit</Link>)}
            <h1 className="post-title">{post.header}</h1>
            <p className="post-body">{post.body}</p>
            { post.video && (<iframe title={post.title} className="post-iframe" src={post.video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)}
        </div>
    );
}

export default Post;