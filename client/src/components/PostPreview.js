import { Link } from 'react-router-dom';
import auth from "../utils/auth";

const PostPreview = ({ post }) => {
    let postbody = post.body[0].body.substr(0, 228);
    if (post.body[0].body.length > 228) {
        postbody += "...";
    }

    return (
        <div key={post._id} className="post">
            {auth.loggedIn() && (<Link className="button" to={`/edit-post/${post._id}`}>Edit Post</Link>)}
            <Link className="post-anchor" to={`/post/${post._id}`}>
                <h2 className="post-title">{post.header}</h2>
                <p className="post-date">{post.createdAt}</p>
                <div class="post-wrapper">
                    {post.image ? <img className="post-thumbnail" src={post.image} alt={post.imagecaption} /> : null}
                    <p className="post-body"><img className="post-thumbnail" src={post.body[0].image} alt={post.body[0].imagecaption} />{postbody}</p>
                    {/* { post.video && (<iframe title={post.title} className="post-iframe" src={post.video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true"></iframe>)} */}
                    {/* <p className="ellipse">Read More</p> */}
                </div>
            </Link>
            <p className="post-category">{post.category}</p>
        </div>
    );
}

export default PostPreview;