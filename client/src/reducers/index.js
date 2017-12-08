import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './reducer_auth';
import User from './reducer_user';
import Friends from './reducer_friends'

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    credentials: User,
    friends: Friends
});

export default rootReducer;
