import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TESTIMONIALS } from "../utils/queries";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const TestimonialCarousel = () => {
const [current, setCurrent] = useState(0);

    const { loading, data } = useQuery(QUERY_TESTIMONIALS);
    const testimonials = data?.testimonials;
    const length = testimonials?.length || 0;
    console.log(length, testimonials);
    console.log(current);

    const carouselScroll = () => {
        if(current === length - 1) {
            return setCurrent(0);
        }
        return setCurrent(current + 1);
    }

    useEffect(() => {
        const carouselInterval = setInterval(() => {carouselScroll()}, 4000)
        return () => clearInterval(carouselInterval);
    });



    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    const previousSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    if(testimonials) {
        return (
        <div id="testimonial-slideshow">
                <FaArrowAltCircleLeft className="left-arrow" onClick={previousSlide} />
            {testimonials && testimonials.map((testimonial, index) => {
                return (
                    <div className={index === current ? 'slide-active' : 'slide'} key={index}>
                        <p>{testimonial.body}</p>
                        <h3>{testimonial.name}</h3>
                    </div>
                )
            })}
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        </div>
        )
    } else {
        return ( <div>Loading...</div>)
    }
}

export default TestimonialCarousel;
// 
// 