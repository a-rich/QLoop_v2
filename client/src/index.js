import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';
import App from './App';
import { userLoggedIn } from './actions/auth';
import { joinBooth } from './actions/createBooth';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(promise, thunk))
);

if(localStorage.QLoopJWT) {
    const user = {
        jwt: localStorage.QLoopJWT,
        data: JSON.parse(localStorage.data)
    };
    store.dispatch(userLoggedIn(user));
    joinBooth(localStorage.boothId)
}

ReactDOM.render(

    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
