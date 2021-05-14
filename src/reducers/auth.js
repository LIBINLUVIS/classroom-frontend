import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    USER_INFO
} from '../actions/types';



const initialState = {
    access: localStorage.getItem('access'),
    isAuthenticated: null,
    user: null
};


export default function(state=initialState,action){  //initialsate is comming from store.js
    const {type,payload}=action;  //type and payload comes from the action/auth
                                 // action/auth and reducer/auth is connected through dispatch mehod in actiion/auth to store

    switch(type){
        case LOGIN_SUCCESS:   //connecting with the redux to store the login data of the user
            localStorage.setItem('access',payload.token)
            return{
              ...state,
              isAuthenticated:true,
              token:payload.token,
              

            }
        case USER_LOADED_SUCCESS:
            
            return{
                ...state,
                user:payload  
               
            }
        case USER_LOADED_FAIL:
            return{
                ...state,
                user:null
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh')
            return{
               ...state,
               access:null,
               refresh:null,
               isAuthenticated:null
            }
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true
            }
        case AUTHENTICATED_FAIL:
            return{
                ...state,
                isAuthenticated:false
            }
        case LOGOUT:
            localStorage.removeItem('access');
            
            return{
                ...state,
                access: null,
                user:null,
                isAuthenticated:false,

            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
        }
        case ACTIVATION_FAIL:
            return {
                ...state
        }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
              
        }
        case SIGNUP_FAIL:

  
        default:
            return state

    }
}


