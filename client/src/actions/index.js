import axios from 'axios';

import { CREATE_USER } from '../types';
import { ROOT_URL } from '../types';


export function createUser(values) {
    const request = axios.post(`${ROOT_URL}/api/users/new/`, values);

    return {
        type: CREATE_USER,
        payload: request
    }
}
