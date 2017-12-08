import axios from 'axios';
import { ADD_FRIEND, REMOVE_FRIEND, GET_FRIENDS } from '../types';
import { ROOT_URL } from '../types';

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

export function getFriends() {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.get(`${ROOT_URL}/api/get_friends/`)
            .then((data: res) => {
            dispatch({
                    type: GET_FRIENDS,
                    payload: data
            });
        });
    }
}