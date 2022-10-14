import slslogo from '../assets/images/slslogow.png';
// import orthoinfologo from '../assets/images/orthoinfologo.png';
import heidenlogo from '../assets/images/heidenlogow.png';
const Footer = () => {
    return (
        <div id="footer">
            <div id="footer-links-container">
                <div id="footer-links">
                    {/* <iframe title="heiden-location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.8140882620214!2d-111.80895598459742!3d40.63398177934046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752630076968479%3A0xc5c7cdfff97ee0cc!2sJason+B.+Dickerson%2C+DPM+-+Heiden+Davidson+Orthopedics!5e0!3m2!1sen!2sus!4v1458247272184" width="400" height="250" frameborder="0" allowfullscreen=""></iframe> */}
                    {/* <p>For appointments with Dr. Scholl, please contact Heiden Orthopedics</p> */}
                    {/* <p>6360 S 3000 E, STE 210 Cottonwood Heights, Utah 84121</p> */}
                    <p>For appointments, please call Heiden Orthopedics during business hours</p>
                    <p>PHONE: <a href="tel:+43561588222">435-615-8822</a></p>
                    <p>HOURS: 8:30am - 5pm MST, Monday - Friday</p>
                    <a href='/info-for-physical-therapists'>Info for Physical Therapists</a>
                </div>
                <div className="fll-wrapper">
                <div className='footer-logo-links'>
                    <a rel="noreferrer" target="_blank" href='https://heidenortho.com/doctors/mark-scholl/'>
                        <img alt="Heiden Orthopedics Logo" src={heidenlogo} />
                    </a>
                    
                </div>
                <div className='footer-logo-links'>
                    <p>If you're seeing Dr. Scholl through Salt Lake Surgical, please call <a href="tel:+8013043274">801-304-3274</a> </p>
                        <a href="https://www.saltlakesurgical.com/">
                        <img id="slsurgical" alt="Salt Lake Surgical Logo" src={slslogo} />
                    </a>
                </div>
                </div>
            </div>
            <div id='footer-copyright'>
                <h1>&copy;Copyright 2022 Mark D Scholl, M.D., P.C All rights reserved.</h1>
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