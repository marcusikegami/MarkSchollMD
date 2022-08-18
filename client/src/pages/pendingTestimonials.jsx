import { useMutation, useQuery } from '@apollo/client';
import { EDIT_TESTIMONIAL } from '../utils/mutations';
import { QUERY_TESTIMONIALS } from '../utils/queries';

import auth from '../utils/auth';

const Approval = () => {
    const [editTestimonial] = useMutation(EDIT_TESTIMONIAL);
    const { data } = useQuery(QUERY_TESTIMONIALS);
    const testimonials = data?.testimonials || [];
    
        const handleDecision = async (_id, approval) => {
            try {
                await editTestimonial({
                    variables: { _id, approval }
                });
            } catch (err) {
                console.error(err);
            }
        }
    
    if(auth.loggedIn()) { 
        return (
        <main>
            <div id="testimonials-wrapper">
                {testimonials?.map(element => {
                    let id = element._id;
                        if(!element.approval) {
                            return (
                                <div key={element._id} id="testimonial">
                                    <p>"{element.body}"</p>
                                    <h3>–{element.name}</h3>
                                    <button className="button" onClick={ () => {handleDecision(id, true)}}>Approve</button>
                                </div>
                            );
                        } 
                        return null;
                    })}
            </div>
        </main>
        )
    } else {
        window.location.assign('/');
    }
};

export default Approval;