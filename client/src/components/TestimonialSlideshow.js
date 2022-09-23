import { useQuery } from "@apollo/client";
import { QUERY_APPROVED_TESTIMONIALS } from "../utils/queries";
import { useState } from "react";

const TestimonialSlideshow = () => {
    const { data } = useQuery(QUERY_APPROVED_TESTIMONIALS);

    const testimonials = data?.testimonials;
    if (testimonials && document.getElementById('testimonial-slideshow')) {
        let slideIndex = 0;
        changeTestimonial();

        function changeTestimonial() {
            let i;
            let slides = document.getElementsByClassName("testimonial-slideshow-testimonial");
            for (i = 0; i < slides.length; i++) {
                // slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            // slides[slideIndex-1].style.display = "block";
            setTimeout(changeTestimonial, 6000);
        }
    }

    return (
        <div id="testimonial-slideshow">
            {testimonials && testimonials.map(testimonial => {
                return (
                    <div className="testimonial-slideshow-testimonial">
                        <p>{testimonial.body}</p>
                        <h3>{testimonial.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default TestimonialSlideshow;