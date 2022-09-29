import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
// import Auth from '../utils/auth';
import heidenlogo from '../assets/images/heidenlogo.png';
import CategoryPreviews from '../components/CategoryPreviews';
import informalheadshot from '../../src/assets/images/informalheadshot.jfif';
import headshot from '../../src/assets/images/markheadshot.jfif';
import Slideshow from '../components/Slideshow';
import TestimonialCarousel from '../components/TestimonialCarousel';

const Home = () => {
    const { data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    // const loggedIn = Auth.loggedIn();
    const main = document.getElementById('main');

    return (
    <div className="main-wrapper">
            
            <div id="hero">

            </div>
        <main id="main">
            <div className="left-column">
                <div id="formal-bio">
                    {/* <h1>Mark D. Scholl, M.D.</h1> */}
                    <div className="headshot-wrapper">
                        <img id="formal-headshot" alt="Headshot of Mark Scholl, M.D." src={headshot} />
                    <p>
                        Mark D. Scholl, M.D., is an Orthopedic Sports Medicine Surgeon who performs complex and
                        advanced techniques of repair and reconstruction primarily of the knee and shoulder. He has
                        special interest in cartilage preservation and maintenance of the biological surfaces of knee
                        and shoulder, as well as restoration of joint stability and ligaments. Dr. Scholl primarily performs
                        surgery arthroscopically or with other minimally invasive techniques, and enjoys developing
                        advances in repair options, and pioneering new procedures.
                        
                    </p>
                    <p>
                        Dr. Scholl has trained at Northwestern University Medical School, and the Emory University
                        Department of Orthopedics for his orthopedic specialist training. He completed a Fellowship in
                        Arthroscopic Surgery and Sports Medicine at the University of Utah. He has been in practice
                        taking care of complex joint injuries for over 15 years.
                        Beyond the arthroscopic surgeries, Dr. Scholl greatly enjoys working closely with athletes of all
                        levels. He has served as Team Physician for a significant number of leagues and teams
                        including the Atlanta Hawks of the NBA, Atlanta Falcons of the NFL, Real Salt Lake of MLS,
                        The Utah Blaze of the AFL, Utah Grizzlies of the ECHL, and many other teams including local
                        high schools and colleges. He has traveled around the world with US Ski Team, and USA
                        Rugby including to places such as Italy, New Zealand, Slovenia, Dubai, and from the East
                        coast to the West coast for matches here in the USA. He has also cared for many individual
                        professional athletes from skiers to climbers, runners, cyclists, MMA fighters and the
                        occasional supercross rider, among various other sports.
                    </p>
                    <p>
                        In his practice, Dr. Scholl puts a high priority on explaining the injuries, and surgeries (or other
                        therapies) to patients, and educating them about the many steps they will travel together on
                        the journey to recovery. He lists the goal for every patient as: “becoming comfortable and
                        functional in the simplest way possible.” Every patient has their own goals for what that
                        function means, whether it is putting away the dishes without pain or returning to professional
                        sports at the highest level, and Dr. Scholl looks forward to helping anyone with an injury
                        achieve that goal.
                    </p>
                    </div>
                </div>
                <div className='category-preview'>
                    <div id="news-and-updates">
                        {posts && <CategoryPreviews posts={posts} /> }
                    </div>
                </div>
                <h3>TESTIMONIALS</h3>
                {main && <TestimonialCarousel />}
            </div>
            <div className='right-column'>
                <Slideshow />
                <div id="informal-bio">
                        <img alt='headshot of Dr. Scholl in Running Garb' src={informalheadshot} />
                        <p>
                        Mark enjoys time in the mountains and challenges of endurance. He is an allmountain skier and a trail runner / Ultramarathoner having completed dozens of races from trail
                        marathons to 50 and 100 mile ultra runs. He has more recently taken up hockey and plays in a
                        Men’s League to enjoy some competition with a scoreboard. For relaxation, he likes to travel, and
                        to go camping in the desert or the mountains with his wife and children.
                        
                        </p>
                </div>
            </div>
        </main>
    </div>
    )
};

export default Home;