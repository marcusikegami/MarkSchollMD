import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Auth from '../utils/auth';
import heidenlogo from '../assets/images/heidenlogo.png';
import PostPreview from '../components/PostPreview';
import CategoryPreviews from '../components/CategoryPreviews';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

    return (
    <div className="main-wrapper">
            <div id="hero">

            </div>
        <main>
            <div className='logo-links'>
                <a href='https://heidenortho.com/'>
                    <img alt="Heiden Orthopedics Logo" src={heidenlogo} />
                </a>
            </div>
            <div className="left-column">
                <div id="formal-bio">
                    
                </div>
                <div className='category-preview'>
                    <div id="news-and-updates">
                        {posts && <CategoryPreviews posts={posts} /> }
                    </div>
                </div>
            </div>
            <div className='right-column'>
                <div id="informal-bio">

                </div>
            </div>
        </main>
    </div>
    )
};

export default Home;