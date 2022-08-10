import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const PatientInfo = () => {
    let {data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div id='posts-wrapper'>
                {posts.map(post => {
                    if((post.category === "Information about surgery with Dr. Scholl" || post.category === "Patient Education" || post.category === "Knee" || post.category === "Shoulder") && post.video) {
                        return (
                            <div key={post._id} className="post">
                                <h1 className="post-title">{post.header}</h1>
                                <p className="post-body">{post.body}</p>
                                <iframe title={post.title} className="post-iframe" src={post.video} />
                            </div>
                        )
                    } else if (post.category === "Information about surgery with Dr. Scholl" || post.category === "Patient Education" || post.category === "Knee" || post.category === "Shoulder") {
                        return (
                            <div key={post._id} className="post">
                                <h1 className="post-title">{post.header}</h1>
                                <p className="post-body">{post.body}</p>
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