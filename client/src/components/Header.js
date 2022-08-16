import Logo from '../assets/images/logo.jpg';
import auth from '../utils/auth';

const Header = () => {
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
          <div className='logo-wrapper'>
            <img id='logo' src={Logo} alt='Mark D. Scholl, M.D., P.C'/>
            <h1>Mark D. Scholl, M.D.</h1>
          </div>
          <nav id='navigation'>
            <a href='/'>Home</a>
            <a href='/patient-education'>Information for Patients</a>
            <a href='/info-for-physical-therapists'>Information for Physical Therapists</a>
            <a href='/news-and-updates'>News and Updates</a>
            <a href='/testimonials'>Testimonials</a>
          </nav>
        </header>
        <div id='header-border'/>
      </div>
    )
}

export default Header;