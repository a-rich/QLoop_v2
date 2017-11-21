import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './index.css';
import reducers from './reducers';
import SignupForm from './containers/signup_form';
import NavbarComponent from './components/navbar_component'

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <NavbarComponent />
                <Switch>
                    <Route to="/" component={SignupForm} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
  , document.getElementById('root'));
registerServiceWorker();
