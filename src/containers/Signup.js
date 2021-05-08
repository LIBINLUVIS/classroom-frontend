import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';

function Signup({signup, isAuthenticated}) {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const { username, email, password, re_password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(username, email, password);
            setAccountCreated(true)
     

            
        }else{
            alert("The password you entered is not matching")
        }
    };

    
    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    if (accountCreated) {
        return <Redirect to='/login' />
    }

    return (
        <div className='container mt-5'>
        <h1>Sign Up</h1>
        <p>Create your Account</p>
        <form onSubmit={e => onSubmit(e)}>

        <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <div className='form-group'>
                <input
                    className='form-control'
                    type='email'
                    placeholder='Email*'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Password*'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='3'
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Confirm Password*'
                    name='re_password'
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength='3'
                    required
                />
            </div>
            <button className='btn btn-primary' type='submit'>Register</button>
        </form>
 
        <p className='mt-3'>
            Already have an account? <Link to='/login'>Sign In</Link>
        </p>
    </div>

    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
   
});
export default connect(mapStateToProps, { signup })(Signup);
