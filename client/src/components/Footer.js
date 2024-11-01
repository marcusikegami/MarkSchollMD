import mdclogo from '../assets/images/mdc-logo.png';
// import orthoinfologo from '../assets/images/orthoinfologo.png';
const Footer = () => {
    return (
        <div id="footer">
            <div id="footer-links-container">
                <div id="footer-links">
                    <p>For appointments, please call during business hours</p>
                    <p>PHONE: <a href="tel:+43561588222">801-261-1391</a></p>
                    <p>HOURS: 8:30am - 5pm MST, Monday - Friday</p>
                    <a href='/info-for-physical-therapists'>Info for Physical Therapists</a>
                </div>
                <div className="fll-wrapper">
                    <div className='footer-logo-links'>
                        <p>If you're seeing Dr. Scholl through Salt Lake Surgical, please call <a href="tel:+3854469788">385-446-9788</a> </p>
                        <a href="https://mdslc.com/">
                            <img className="mdc-logo" alt="Salt Lake Surgical Logo" src={mdclogo} />
                        </a>
                    </div>
                </div>
            </div>
            <div id='footer-copyright'>
                <h1>&copy;Copyright 2024 Mark D Scholl, M.D., P.C All rights reserved.</h1>
            </div>
        </div>
    )
}

export default Footer;

// For appointments contact heiden ortho number
// orthoinfologo in patient info
// include heiden logolink
// include clarification about slsurgical and heiden non-affiliation
// copyright bottom right corner