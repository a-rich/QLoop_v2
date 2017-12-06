import { USER_LOGGED_IN, USER_LOGGED_OUT, ADD_FRIEND, REMOVE_FRIEND, REMOVE_FAVORITE_SONG } from '../types';

export default function(state = {}, action) {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.payload;
        case USER_LOGGED_OUT:
            return {};
        case ADD_FRIEND:
            return state;
        case REMOVE_FRIEND:
            return state;
        case REMOVE_FAVORITE_SONG:
            return state;
        default:
            return state;
    }
}
