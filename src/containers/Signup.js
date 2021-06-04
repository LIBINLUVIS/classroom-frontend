import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../component css/login.css';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { makeStyles } from "@material-ui/core/styles"; 
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

function Signup({signup, isAuthenticated}) {
    
    const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const [alert,setAlert]=useState('')
    const { username, email, password, re_password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(username, email, password).then((response)=>{
                if(response){
                    if(response.status==400){
                        setAlert('Username Taken')
                   }
                   if(response.status==500){
                       setAlert('Internal Server Error')
                   }
                }else{
                    setAccountCreated(true)
                }
            }).catch((err)=>{
                setAlert('Network Error Please try again')
            })
                
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
        <main>
        <div className='container-login mt-5 mb-4'>
            <div className="app-wrapper">
        <h1 className="title">Sign Up</h1>
        <p>Create your Account</p>
        <form onSubmit={e => onSubmit(e)}>

        <div className='form-group'>
                <input
                    className='input'
                    type='text'
                    placeholder='Username*'
                    name='username'
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
            </div>

            <div className='form-group'>
                <input
                    className='input'
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
                    className='input'
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
                    className='input'
                    type='password'
                    placeholder='Confirm Password*'
                    name='re_password'
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength='3'
                    required
                />
            </div>
            <button className='btn' type='submit'>Register</button>
        </form>
 
        <p className='mt-3'>
            Already have an account? <Link to='/login'>Sign In</Link>
        </p>
        {alert?<div className={classes.root} style={{marginTop:"20px"}}>
            <Alert severity="error">
                 {alert}— check it out!
            </Alert>
          </div>:null}
        </div>
        </div>
        </main>

    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
   
});
export default connect(mapStateToProps, { signup })(Signup);
