import _ from 'lodash';
import { CREATE_USER } from '../actions/index';

export default function(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}