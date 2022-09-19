import { useQuery } from "@apollo/client";
import { QUERY_APPROVED_TESTIMONIALS } from "../utils/queries";
import { useState } from "react";

const TestimonialSlideshow = () => {
    const [testimonial, setTestimonial] = useState({ body: '', name: ''});
    const { data } = useQuery(QUERY_APPROVED_TESTIMONIALS);

    const testimonials = data?.testimonials || [];
    if (testimonials) {
        console.log(testimonials);
    }

    return (
        <div id="testimonial-slideshow">
                    <div className="testimonial-slideshow-testimonial">
                        <p>{testimonial.body}</p>
                        <h3>{testimonial.name}</h3>
                    </div>
        </div>
    )
}

export default TestimonialSlideshow;