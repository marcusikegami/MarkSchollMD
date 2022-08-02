import Logo from '../assets/images/logo.png';
import auth from '../utils/auth';


const Header = () => {
    const logout = event => {
        event.preventDefault();
        auth.logout();
    }

    return (
        <div className='App'>
        <header id='header'>
          <div className='logo-wrapper'>
            <img id='logo' src={Logo} alt='Mark D. Scholl, M.D., P.C'/>
          </div>
          <nav id='navigation'>
            <a href='/'>Home</a>
            <a href='/'>Information for Patients</a>
            <a href='/'>Information for Physical Therapists</a>
            <a href='/'>News and Updates</a>
            <a href='/'>Testimonials</a>
            {auth.loggedIn() ? (
                <a href='/' onClick={logout}>Logout</a>
                ) : (
                      <></>
                    )}
                    
          </nav>
        </header>
          {auth.loggedIn() && (
            <div id='adminMenu'>
                <div className='actions'>
                    <a href='/create-post'>Create Post</a>
                </div>
            </div>
          )}
      </div>
    )
}

export default Header;