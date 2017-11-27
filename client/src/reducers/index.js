import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import SignupReducer from './reducer_signup';
import User from './reducer_user';

const rootReducer = combineReducers({
    form: formReducer,
    signup: SignupReducer,
    credentials: User
});

export default rootReducer;
