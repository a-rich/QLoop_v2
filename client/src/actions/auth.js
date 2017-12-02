import axios from 'axios';

import { USER_LOGGED_IN, USER_LOGGED_OUT, ROOT_URL, RESET_PASSWORD } from '../types';

export const userLoggedIn = data => ({
    type: USER_LOGGED_IN,
    payload: data
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});


export function login(credentials, callback) {
    const request = axios.post(`${ROOT_URL}/api/user/`, credentials);

    return (dispatch) => {
        request.then((data: res) => {
            localStorage.QLoopJWT = data.data.token;
            localStorage.data = JSON.stringify(data.data.data);
            callback();
            dispatch(userLoggedIn(data.data));
        });
    }
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem("QLoopJWT");
        localStorage.removeItem("data");
        dispatch(userLoggedOut());
    }
}

export function resetPassword(token, values) {
    const request = axios.post(`${ROOT_URL}/api/users/reset_password/${token}/`, values);

    return {
        type: RESET_PASSWORD,
        payload: request
    }
}
