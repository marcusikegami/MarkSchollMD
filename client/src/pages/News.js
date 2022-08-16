import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Post from '../components/Post';

const News = () => {
    let { data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div id='posts-wrapper'>
                {posts && posts.map(post => {
                    if(post.category === "News and Updates") {
                        return (
                           <Post key={post._id} post={post} /> 
                        )
                    }
                    return null;
                }
                )}
            </div>
        </main>
    )
};

export default News;
