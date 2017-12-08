import { ADD_FRIEND, REMOVE_FRIEND, GET_FRIENDS } from '../types';

export default function(state = [], action) {
    switch (action.type) {
        case ADD_FRIEND:
            return action.payload.data.data;
        case REMOVE_FRIEND:
            return action.payload.data.data;
        case GET_FRIENDS:
            return action.payload.data.friends;
        default:
            return state;
    }
}