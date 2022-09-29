import slslogo from '../assets/images/slslogo.png';
import orthoinfologo from '../assets/images/orthoinfologo.png';
import heidenlogo from '../assets/images/heidenlogo.png';
const Footer = () => {
    return (
        <div id="footer">
            <div className='footer-logo-links'>
                <a rel="noreferrer" target="_blank" href='https://heidenortho.com/doctors/mark-scholl/'>
                    <img alt="Heiden Orthopedics Logo" src={heidenlogo} />
                </a>
                <a href="https://www.saltlakesurgical.com/">
                    <img id="slsurgical" alt="Salt Lake Surgical Logo" src={slslogo} />
                </a>
            </div>
            <div id="footer-links">
            <p>For appointments, please call  <a href="tel:+43561588222">435-615-8822</a> during business hours (8:30am – 5pm MST)</p>
            <a href='/info-for-physical-therapists'>Info for Physical Therapists</a>
            </div>
            <h1>Copyright 2022 Mark D Scholl, M.D., P.C All rights reserved.</h1>
        </div>
    )
}

export default Footer;

// For appointments contact heiden ortho number
// orthoinfologo in patient info
// include heiden logolink
// include clarification about slsurgical and heiden non-affiliation
// copyright bottom right corner