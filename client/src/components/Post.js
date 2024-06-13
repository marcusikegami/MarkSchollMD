import { Link } from 'react-router-dom';
import auth from "../utils/auth";

const Post = ({ post }) => {
    return (
        <div key={post._id} className="post">
            {auth.loggedIn() && (<Link className="button" to={`/edit-post/${post._id}`}>Edit Post</Link>)}
            <h2 className="post-title">{post.header}</h2>
            <p className="post-date">{post.createdAt}</p>
            <div class="post-wrapper">
                {post.video && (<iframe title={post.title} className="post-iframe" src={post.video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)}
                {post.image && (<img src={post.image} alt={post.imagecaption} />)}
                <p className="post-body">{post.body}</p>
            </div>
            <p className="post-category">{post.category}</p>
        </div>
    );
}

export default Post;