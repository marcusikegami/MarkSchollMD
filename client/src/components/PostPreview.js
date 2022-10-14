import auth from "../utils/auth";
import { Link } from 'react-router-dom';

const PostPreview = ({post}) => {
        let postbody = post.body[0].body.substr(0, 228);
    return (
        <div key={post._id} className="post">
            {auth.loggedIn() && (<Link className="button" to={`/edit-post/${post._id}`}>Edit Post</Link>)}
            <Link  className="post-anchor" to={`/post/${post._id}`}>
                <h2 className="post-title">{post.body[0].header}</h2>
                <p className="post-date">{post.createdAt}</p>
                
                <p className="post-body"><img className="post-thumbnail" src={post.body[0].image} alt={post.body[0].imagecaption} />{post.body[0].body} ...</p>
                {/* { post.video && (<iframe title={post.title} className="post-iframe" src={post.video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)} */}
                {/* <p className="ellipse">Read More</p> */}
            </Link>
            <p className="post-category">{post.category}</p>
        </div>
    );
}

export default PostPreview;