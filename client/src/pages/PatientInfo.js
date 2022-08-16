import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import orthoinfologo from '../assets/images/orthoinfologo.png';

const PatientInfo = () => {
    let {data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div className="page-hero">
                <a href="https://orthoinfo.aaos.org/"><img alt="orthoinfo.org logo" src={orthoinfologo}/></a>
            </div>
            <div id='posts-wrapper'>
                {posts.map(post => {
                    if(post.category === "Information about surgery with Dr. Scholl" || post.category === "Patient Education" || post.category === "Knee" || post.category === "Shoulder") {
                        return (
                            <div key={post._id} className="post">
                                {auth.loggedIn() && (<Link to={`/edit-post/${post._id}`}>Edit</Link>)}
                                <p className="created-at-date">{post.createdAt}</p>
                                <h1 className="post-title">{post.header}</h1>
                                <p className="post-body">{post.body}</p>
                                { post.video && (<iframe title={post.title} className="post-iframe" src={post.video} />)}
                            </div>
                        )
                    }
                    return null;
                })};
            </div>
        </main>
    )
};

export default PatientInfo;