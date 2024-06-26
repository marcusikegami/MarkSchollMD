import { useQuery } from "@apollo/client";
import { useState } from "react";
import informalheadshot from "../../src/assets/images/informalheadshot.jfif";
import headshot from "../../src/assets/images/markheadshot.jfif";
import orthopatientlogo from "../assets/images/orthopatientlogo.svg";
import CategoryPreviews from "../components/CategoryPreviews";
import Slideshow from "../components/Slideshow";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const { data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  // const loggedIn = Auth.loggedIn();
  const main = document.getElementById("main");
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="main-wrapper">
      <div id="hero"></div>
      <main id="main">
        <div className="left-column">
          <div id="formal-bio">
            {/* <h1>Mark D. Scholl, M.D.</h1> */}
            <div className="headshot-wrapper">
              <img
                id="formal-headshot"
                alt="Headshot of Mark Scholl, M.D."
                src={headshot}
              />

              <div id="bio-content">
                <p>
                  Mark D. Scholl, M.D., is an Orthopedic Sports Medicine Surgeon who performs complex and advanced techniques of repair and reconstruction primarily of the knee and shoulder. He has
                  special interest in cartilage preservation and maintenance of
                  the biological surfaces of knee and shoulder, as well as
                  restoration of joint stability and ligaments. Dr. Scholl
                  primarily performs surgery arthroscopically or with other
                  minimally invasive techniques, and enjoys developing advances in
                  repair options, and pioneering new procedures.
                </p>
                {isExpanded && (
                  <>
                    <p>
                      Dr. Scholl has trained at Northwestern University Medical
                      School, and the Emory University Department of Orthopedics for
                      his orthopedic specialist training. He completed a Fellowship in
                      Arthroscopic Surgery and Sports Medicine at the University of
                      Utah. He has been in practice taking care of complex joint
                      injuries for over 15 years. Beyond the arthroscopic surgeries,
                      Dr. Scholl greatly enjoys working closely with athletes of all
                      levels. He has served as Team Physician for a significant number
                      of leagues and teams including the Atlanta Hawks of the NBA,
                      Atlanta Falcons of the NFL, Real Salt Lake of MLS, The Utah
                      Blaze of the AFL, Utah Grizzlies of the ECHL, and many other
                      teams including local high schools and colleges. He has traveled
                      around the world with US Ski Team, and USA Rugby including to
                      places such as Italy, New Zealand, Slovenia, Dubai, and from the
                      East coast to the West coast for matches here in the USA. He has
                      also cared for many individual professional athletes from skiers
                      to climbers, runners, cyclists, MMA fighters and the occasional
                      supercross rider, among various other sports.
                    </p>
                    <p>
                      In his practice, Dr. Scholl puts a high priority on explaining
                      the injuries, and surgeries (or other therapies) to patients,
                      and educating them about the many steps they will travel
                      together on the journey to recovery. He lists the goal for every
                      patient as: “becoming comfortable and functional in the simplest
                      way possible.” Every patient has their own goals for what that
                      function means, whether it is putting away the dishes without
                      pain or returning to professional sports at the highest level,
                      and Dr. Scholl looks forward to helping anyone with an injury
                      achieve that goal.
                    </p>
                  </>
                )}
              </div>
              <button className="button" onClick={handleToggle}>
                {isExpanded ? 'Show Less' : 'Load More'}
              </button>
            </div>
          </div>
          <div className="category-preview">
            <div id="news-and-updates">
              {posts && <CategoryPreviews posts={posts} />}
            </div>
          </div>
          <div id="testimonial-slideshow-wrapper">
            <h1 id="testimonial-h1">TESTIMONIALS</h1>
            {main && <TestimonialCarousel />}
          </div>
        </div>
        <div className="right-column">
          <div className="orthopatient-logo">
            <a
              href="https://orthopatient.com/dr/scholl"
              target="_blank"
              rel="noreferrer"
            >
              <img
                id="orthopatient-logo"
                src={orthopatientlogo}
                alt="orthopatient.com logo and link to scholls directory"
              />
            </a>
          </div>
          <div id="informal-bio">
            <img
              alt="headshot of Dr. Scholl in Running Garb"
              src={informalheadshot}
            />
            <p>
              Mark enjoys time in the mountains and challenges of endurance. He
              is an allmountain skier and a trail runner / Ultramarathoner
              having completed dozens of races from trail marathons to 50 and
              100 mile ultra runs. He has more recently taken up hockey and
              plays in a Men’s League to enjoy some competition with a
              scoreboard. For relaxation, he likes to travel, and to go camping
              in the desert or the mountains with his wife and children.
            </p>
          </div>
          <Slideshow />
        </div>

      </main>
    </div>
  );
};

export default Home;
