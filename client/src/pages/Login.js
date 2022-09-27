import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_ADMIN } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_ADMIN);

    //handle login form state change
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <main>
            <div id='login-wrapper'>
                <form id='testimonial-form' onSubmit={handleFormSubmit}>
                    <input
                        className='form-input'
                        placeholder='Username'
                        name='username'
                        type='text'
                        id='username'
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        className='form-input'
                        placeholder='Password'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button type='submit'>Login</button>
                </form>

                {error && <div>Login Failed</div>}
            </div>
        </main>
    )
}

export default Login;