import React,{useState,Fragment} from 'react'
import axios from '../Axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL
} from './types'



const api="userinfo/";
const url="api/login/";
const api2="register/";


export const load_user = () => async dispatch => {   
    if (localStorage.getItem('access')) {
        const config = {                      
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${localStorage.getItem('access')}`,
                'Accept': 'application/json' 
            }
        }; 

        try {
            const res = await axios.get(api, config); //passing back the current user auth details
           // console.log(res.data)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const checkAuthenticated=() => async dispatch => {  //checking the state of the user returning a boolean value
                                                           //is auth or not 
       
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        };
        const body=JSON.stringify({token:localStorage.getItem('access')});
        
        try{
           
           if(body){
              
            dispatch({
                type:AUTHENTICATED_SUCCESS
            });
              
           }
           
        }catch(err){
            dispatch({
                type:AUTHENTICATED_FAIL
            })
        }
    }
        else{
            dispatch({
                type:AUTHENTICATED_FAIL
            });
        }

};

export const login = (username, password) => async dispatch => {
    
    

  
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });
    

    try {
        const res = await axios.post(url, body, config);

        dispatch({
            type: LOGIN_SUCCESS,  //connecting with the reducer auth !!!
            payload: res.data
        });


      dispatch(load_user()); 
     return{
         status:false
     }
    } catch (err) {
        
        // alert("Oops You entered Wrong password or username !")
       
        dispatch({
            type: LOGIN_FAIL
        })
        return{
            status:true
        }
    }

};

export const signup = (username,email, password) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password });

    try {
        const res = await axios.post(api2, body, config);  //if try fails at the line the code get blocks 
       
        dispatch({
            
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        
        alert("username taken")
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

