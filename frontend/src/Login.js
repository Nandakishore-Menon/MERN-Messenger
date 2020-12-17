import React from 'react'
import {Button} from '@material-ui/core'
import {provider} from './firebase.js'
import auth from './firebase.js'
import './Login.css'
import {useStateValue} from "./StateProvider.js";
import { actionTypes } from './reducer.js'
function Login() {

    const [{},dispatch] = useStateValue();

    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then((result)=> {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
        })
        .catch((error)=> alert(error.message));
    };
    return (
        <div className='login'>
            <div className="login_container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Google_Messages_logo.svg/900px-Google_Messages_logo.svg.png" alt=""/>
                {/* <svg height="2500" width="2500" xmlns="http://www.w3.org/2000/svg" viewBox="1.313 0.2629999999999768 509.637 509.636"><g fill="none"><circle cx="256.263" cy="254.95" fill="#1a73e8" r="254.687"/><path d="M348.948 364.964H175.393c-24.681 0-46.211-18.642-46.211-43.323v-.263 14.441c0 24.682 21.53 46.212 46.21 46.212h173.556c24.943 0 46.211-21.793 46.211-46.212v-14.44c0 24.68-21.53 43.585-46.211 43.585zM128.919 240.509v-19.693l-32.295-53.3c-1.838-2.888-2.626-5.514-2.363-8.14v22.58c0 2.101.787 4.202 2.1 6.565z" fill="#185abc"/><path d="M348.948 150.712H105.813c-9.715 0-15.228 8.402-8.664 17.329l31.77 55.138v98.462c0 25.206 18.38 46.211 43.323 46.211h176.443c24.944 0 46.211-21.267 46.211-46.211V197.186c.263-25.207-21.005-46.474-45.948-46.474z" fill="#fff"/><g fill="#8ab4f8"><path d="M346.06 220.291H178.28c-7.352 0-14.441-4.463-14.441-11.553 0-7.089 7.09-11.552 14.441-11.552h167.778c7.352 0 14.442 4.463 14.442 11.552 0 7.09-7.09 11.553-14.442 11.553zM346.06 266.503H178.28c-7.352 0-14.441-4.464-14.441-11.553 0-7.09 7.09-11.553 14.441-11.553h167.778c7.352 0 14.442 4.464 14.442 11.553s-7.09 11.553-14.442 11.553zM299.586 312.976H178.018c-7.351 0-14.44-4.463-14.44-11.552s7.089-11.553 14.44-11.553h121.568c7.351 0 14.44 4.463 14.44 11.553s-7.089 11.552-14.44 11.552z"/></g><path d="M510.95 253.637c-.525 111.59-73.256 206.375-173.555 239.984-25.469 8.664-52.776 13.128-81.132 13.128-140.21 0-253.9-113.165-254.688-253.112v1.575c0 140.735 113.953 254.687 254.688 254.687 28.356 0 55.663-4.726 81.132-13.128C438.219 462.901 510.95 367.59 510.95 255.212z" fill="#185abc"/><path d="M337.132 13.39C311.664 4.727 284.357.264 256 .264 115.266.263 1.313 114.215 1.313 254.95v1.575C2.1 116.578 115.79 3.413 256 3.413c28.357 0 55.664 4.726 81.132 13.129 100.562 33.608 173.03 128.393 173.555 239.983v-1.575c.263-112.378-72.468-207.688-173.555-241.56z" fill="#8ab4f8"/></g></svg> */}
                <div className="login_text">
                    <h1>Simple</h1>
                </div>
                <Button onClick = {signIn}>Sign In with Google</Button>
            </div>
            
        </div>
    )
}

export default Login
