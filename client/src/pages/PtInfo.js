import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PostPreview from '../components/PostPreview';

const PtInfo = () => {
    let { data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div id='posts-wrapper'>
            {posts.map(post => {
                    if(post.category === "Information for Physical Therapists") {
                        return (
                            <PostPreview post={post} />
                        )
                    }
                    return null;
                })};
            </div>
        </main>
    )
};

export default PtInfo;