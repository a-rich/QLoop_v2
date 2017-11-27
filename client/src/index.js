import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';
import App from './App';
import { userLoggedIn } from './actions/auth';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(promise, thunk))
);

if(localStorage.QLoopJWT) {
    const user = { token: localStorage.QLoopJWT };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
