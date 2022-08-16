import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import Auth from '../utils/auth';
import heidenlogo from '../assets/images/heidenlogo.png';
import slslogo from '../assets/images/slslogo.png';
import orthoinfologo from '../assets/images/orthoinfologo.png';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

    return (
        <div className='logo-links'>
            <img alt="Heiden Orthopedics Logo" src={heidenlogo} />
        </div>
    )
};

export default Home;