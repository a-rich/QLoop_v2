import { USER_LOGGED_IN, USER_LOGGED_OUT, ADD_FRIEND, REMOVE_FRIEND, REMOVE_FAVORITE_SONG } from '../types';

export default function(state = [], action) {
    switch (action.type) {
        case ADD_FRIEND:
            return action.payload;
        case REMOVE_FRIEND:
            return action.payload;
        default:
            return state;
    }
}