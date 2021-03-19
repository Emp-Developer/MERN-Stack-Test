import axios from 'axios';
import setAuthtoken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

// Register User
export const registerUser = (userData, history) => diapatch => {
    axios
        .post('https://localhost:4000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            diapatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("https://localhost:4000/api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // set token to Auth header
            setAuthtoken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log User out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");

    // Remove auth header for future request
    setAuthtoken(false);

    // Set current user to empty object
    dispatch(setCurrentUser({}));
};