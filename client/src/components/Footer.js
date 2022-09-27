import slslogo from '../assets/images/slslogo.png';
import orthoinfologo from '../assets/images/orthoinfologo.png';

const Footer = () => {
    return (
        <div id="footer">
            <a href="https://www.saltlakesurgical.com/"><img id="slsurgical" alt="Salt Lake Surgical Logo" src={slslogo} /></a>
            <a href="https://orthoinfo.aaos.org/"><img id="orthoinfo" alt="Ortho Info Aaos Logo" src={orthoinfologo} /></a>
        </div>
    )
}

export default Footer;