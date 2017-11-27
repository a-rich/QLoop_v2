import axios from 'axios';

import { USER_LOGGED_IN, USER_LOGGED_OUT, ROOT_URL } from '../types';

export const userLoggedIn = data => ({
    type: USER_LOGGED_IN,
    payload: data
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});


export function login(credentials, callback) {
    const request = axios.post(`${ROOT_URL}/users/login`, credentials);

    return (dispatch) => {
        request.then((data: res) => {
            localStorage.QLoopJWT = data.data.token;
            callback();
            dispatch(userLoggedIn(data.data));
        });
    }
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem("QLoopJWT");
        dispatch(userLoggedOut());
    }
}
