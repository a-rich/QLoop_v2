import axios from 'axios';

export const CREATE_USER = 'create_user';

const ROOT_URL = 'http://localhost:3000';

export function createUser(values) {
    const request = axios.post(`${ROOT_URL}/users/register`, values);

    return {
        type: CREATE_USER,
        payload: request
    }
}
