import axios from 'axios';

import { ENQUEUE, ROOT_URL } from '../types';

export function enqueue(values) {
    console.log(values)
    const reqData = {url: values.videoId, booth_id: localStorage.getItem('boothId')}
    return (dispatch) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('QLoopJWT');
        axios.post(`${ROOT_URL}/api/booth/enqueue/`, reqData)
            .then((data: res) => {
                console.log(data);
            dispatch({
                    type: ENQUEUE,
                    payload: data
            });
        });
    }
}