import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import PostPreview from '../components/PostPreview';
import orthoinfologo from '../assets/images/orthoinfologo.png';

const PatientInfo = () => {
    let {data } = useQuery(QUERY_POSTS);
    let posts = data?.posts || [];

    return (
        <main>
            <div className="logo-links">
                <a href="https://orthoinfo.aaos.org/"><img alt="orthoinfo.org logo" src={orthoinfologo}/></a>
            </div>
            <div id='posts-wrapper'>
                {posts.map(post => {
                    if(post.category === "Information about surgery with Dr. Scholl" || post.category === "Patient Education" || post.category === "Knee" || post.category === "Shoulder") {
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

export default PatientInfo; 


// ortho info specific links to 