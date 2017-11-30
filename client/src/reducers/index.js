import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './reducer_auth';
import User from './reducer_user';

const rootReducer = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    credentials: User
});

export default rootReducer;
