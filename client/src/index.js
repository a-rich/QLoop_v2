import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import App from './App';
//import SignupForm from './containers/signup_form';
//import LoginForm from './components/login_form';
//import NavbarComponent from './components/navbar_component'

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  , document.getElementById('root'));
registerServiceWorker();
