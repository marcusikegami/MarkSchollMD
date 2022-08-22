import Logo from '../assets/images/logo.jpg';
import auth from '../utils/auth';
import bars from '../assets/images/bars.svg';

const Header = () => {

  function dropdown() {
    if(window.matchMedia("(max-width: 1100px)").matches) {
         var x = document.getElementById("navigation");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
   } 
   }
  }
  const logout = event => {
      event.preventDefault();
      auth.logout();
  } 
    return (
        <div>
          {auth.loggedIn() && (
            <div id='adminMenu'>
                <p>Logged in as Admin</p>
                <div className='actions'>
                    <a href='/create-post'>Create Post</a>
                    <a href='/pending-testimonials'>Pending Testimonials</a>
                    <a href='/' onClick={logout}>Logout</a>
                </div>
            </div>
          )}
        <header id='header'>
          <div id='header-wrapper'>
            <div className='logo-wrapper'>
              <img id='logo' src={Logo} alt='Mark D. Scholl, M.D., P.C'/>
              <h1>Mark D. Scholl, M.D.</h1>
            </div>
            <div id="dropdown-wrapper">
              <button class="dropdown" onClick={() => dropdown()}>
                  <img id="hamburger-icon" src={bars} alt="dropdown menu" width="16" height="16"/>
              </button> 
            </div>
          </div>
            <nav id='navigation'>
            <a href='/'>Home</a>
            <a href='/info-for-physical-therapists'>Information for Physical Therapists</a>
            <a href='/patient-education'>Information for Patients</a>
            <a href='/news-and-updates'>News and Updates</a>
            <a href='/testimonials'>Testimonials</a>
          </nav>
        </header>
        <div className='header-border red'/>
          
        {/* <div className='header-border orange'/> */}
      </div>
    )
}

export default Header;