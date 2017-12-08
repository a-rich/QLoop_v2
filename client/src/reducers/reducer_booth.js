import { CREATE_PUBLIC_BOOTH, JOIN_BOOTH, USER_LOGGED_OUT } from '../types';

export default function(state = [], action) {
    switch (action.type) {
        case CREATE_PUBLIC_BOOTH:
            return action.payload.data.data;
        case JOIN_BOOTH:
            return action.payload.data.data;
        case USER_LOGGED_OUT:
            return [];
        default:
            return state;
    }
}