import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_TESTIMONIALS } from "../utils/queries";
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa';


const TestimonialCarousel = () => {
const [current, setCurrent] = useState(0);

    const { loading, data } = useQuery(QUERY_TESTIMONIALS);
    const testimonials = data?.testimonials;
    const length = testimonials?.length || 0;


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
                    <div className={index === current ? 'slide-active' : 'slide'}>
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