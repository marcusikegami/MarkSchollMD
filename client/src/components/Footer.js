import slslogo from '../assets/images/slslogo.png';
import orthoinfologo from '../assets/images/orthoinfologo.png';

const Footer = () => {
    return (
        <div id="footer">
            <img alt="Salt Lake Surgical Logo" src={slslogo} />
            <img alt="Ortho Info Aaos Logo" src={orthoinfologo} />
        </div>
    )
}

export default Footer;