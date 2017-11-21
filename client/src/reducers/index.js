import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import SignupReducer from './reducer_signup';

const rootReducer = combineReducers({
    form: formReducer,
    signup: SignupReducer
});

export default rootReducer;
