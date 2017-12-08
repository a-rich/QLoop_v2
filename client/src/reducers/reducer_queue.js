import { USER_LOGGED_OUT, ENQUEUE } from '../types';

export default function(state = {}, action) {
    switch (action.type) {
        case ENQUEUE:
            return action.payload;
        case USER_LOGGED_OUT:
            return {};
        default:
            return state;
    }
}