import _ from 'lodash';
import { CREATE_USER, RECOVER_USER, RESET_PASSWORD } from '../types';

export default function(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return _.omit(state, action.payload);
        case RECOVER_USER:
            return action.payload;
        case RESET_PASSWORD:
            return action.payload;
        default:
            return state;
    }
}
