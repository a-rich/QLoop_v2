import axios from 'axios';
import { CREATE_PUBLIC_BOOTH, JOIN_BOOTH, GET_BOOTH } from '../types';
import { ROOT_URL } from '../types';

export const userBooth = data => ({
    type: CREATE_PUBLIC_BOOTH,
    payload: data
});

export function createPublicBooth(value, callBack) {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/create_booth/`, value)
            .then((data: res) => {
                console.log(data);
                localStorage.boothId = data.data.data.bid;
                callBack();
            dispatch({
                    type: CREATE_PUBLIC_BOOTH,
                    payload: data
            });
                
        });
    }
}

export function joinBooth(value, callback) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/api/join_booth/${value}/`, { username: JSON.parse(localStorage.data).username })
            .then((data: res) => {
                callback();
            dispatch({
                    type: JOIN_BOOTH,
                    payload: data
            });
        });
    }
}

export function getBoothData(value, callback) {
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.get(`${ROOT_URL}/api/get_booth/${value}/`)
            .then((data: res) => {
                callback();
            dispatch({
                    type: GET_BOOTH,
                    payload: data
            });
        });
    }
}