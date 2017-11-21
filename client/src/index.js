import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import './index.css';
import reducers from './reducers';
//import App from './App';
import Navbar from './components/navbar'

import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
        <Navbar />
        <Switch>
            
        </Switch>
    </div>
    </BrowserRouter>
    </Provider>
  , document.getElementById('root'));
registerServiceWorker();
