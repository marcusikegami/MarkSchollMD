import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const News = () => {
    let { data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div id='posts-wrapper'>
                {posts.map(post => {
                    if(post.category === "News and Updates" && post.video) {
                        return (
                            <div key={post._id} className="post">
                                <h1 className="post-title">{post.header}</h1>
                                <p className="post-body">{post.body}</p>
                                <iframe title={post.title} className="post-iframe" src={post.video} />
                            </div>
                        )
                    } else if (post.category === "News and Updates")  {
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

export default News;
