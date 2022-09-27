import { useMutation, useQuery } from '@apollo/client';
import { EDIT_TESTIMONIAL } from '../utils/mutations';
import { QUERY_TESTIMONIALS } from '../utils/queries';
import { REMOVE_TESTIMONIAL } from '../utils/mutations';

import auth from '../utils/auth';

const Approval = () => {
    const [removeTestimonial] = useMutation(REMOVE_TESTIMONIAL);
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
        const handleRemoveTestimonial = async (_id) => {
            const confirmation = window.confirm('Are you sure you want to remove this testimonial?');
            if(confirmation) {
                try {
                    await removeTestimonial({
                        variables: { _id}
                    });
                    window.location.reload();
                } catch (err) {
                    console.error(err);
                }
            }
            return;
        }
    
    if(auth.loggedIn()) { 
        return (
        <main>
            <div id="testimonials-wrapper">
                {testimonials?.map(element => {
                    let id = element._id;
                            return (
                                <div key={element._id} className={`testimonial ${element.approval ? 'green' : 'light-red'}`}>
                                    <p>"{element.body}"</p>
                                    <h3>–{element.name}</h3>
                                    <button className="button" onClick={ () => {handleDecision(id, true)}}>Display</button>
                                    <button className="button" onClick={ () => {handleDecision(id, false)}}>Hide</button>
                                    <button className="button" onClick={ () => {handleRemoveTestimonial(id)}}>Remove</button>

                                </div>
                            );
                    })}
            </div>
        </main>
        )
    } else {
        window.location.assign('/');
    }
};

export default Approval;