import One from '../assets/images/slideshow/1.jfif';
import Two from '../assets/images/slideshow/2.jfif';
import Three from '../assets/images/slideshow/3.jfif';
import Four from '../assets/images/slideshow/4.jfif';
import Five from '../assets/images/slideshow/5.jfif';
import morocco from '../assets/images/slideshow/morocco.jfif';
import ultra from '../assets/images/slideshow/ultra.jfif';

const Slideshow = () => {
    
    if(
        document.getElementById('slideshow-container')
    ) {
        let slideIndex = 0;
        showSlides();
    
        function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 5500); // Change image every 2 seconds
        }
    }
    
    return (
    <div id='slideshow-wrapper'>
        <div id='slideshow-container'>
            <div className="mySlides fade">
                <div className="numbertext">1 / 7</div>
                <img src={One} alt="caption" />
                <div className="text">Caption Text</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">2 / 7</div>
                <img src={Two} alt="caption" />
                <div className="text">Caption Two</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">3 / 7</div>
                <img src={Three} alt="caption" />
                <div className="text">Caption Three</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">4 / 7</div>
                <img src={Four} alt="caption" />
                <div className="text">Caption Three</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">5 / 7</div>
                <img src={Five} alt="caption" />
                <div className="text">Caption Three</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">6 / 7</div>
                <img src={morocco} alt="caption" />
                <div className="text">Caption Three</div>
            </div>
            <div className="mySlides fade">
                <div className="numbertext">7 / 7</div>
                <img src={ultra} alt="caption" />
                <div className="text">Caption Three</div>
            </div>
            </div>
            <br />
            <div className="text-center">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            </div>
    </div>
    )
}

export default Slideshow;