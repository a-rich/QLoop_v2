import axios from 'axios';
import { CREATE_USER, RECOVER_USER, ADD_FRIEND, REMOVE_FRIEND, REMOVE_FAVORITE_SONG } from '../types';
import { ROOT_URL } from '../types';


export function createUser(values) {
    const request = axios.post(`${ROOT_URL}/api/new_user/`, values);

    return {
        type: CREATE_USER,
        payload: request
    }
}

export function recoverUser(values) {
    const request = axios.post(`${ROOT_URL}/api/reset_password/`, values);

    return {
        type: RECOVER_USER,
        payload: request
    }
}

export function addFriend(values) {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/add_friend/`, values)
            .then((data: res) => {
            dispatch({
                    type: ADD_FRIEND,
                    payload: data
            });
        });
    }
}

export function removeFriend(values) {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/remove_friend/`, values)
            .then((data: res) => {
            dispatch({
                    type: REMOVE_FRIEND,
                    payload: data
            });
        });
    }
}

export function removeFavoriteSong(values) {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/remove_song/`, values)
            .then((data: res) => {
            dispatch({
                    type: REMOVE_FAVORITE_SONG,
                    payload: data
            });
        });
    }
}
