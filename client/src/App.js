import React from 'react';
import { Route } from 'react-router-dom';

import SignupForm from './containers/signup_form';
import LoginForm from './components/login_form';
import NavbarComponent from './components/navbar_component';

const App = () => (
    <div>
        <NavbarComponent />
        <div className = "container">
            <Route path="/" exact component={LoginForm} />
            <Route path="/signup" exact component={SignupForm} />
            <Route path="/login" exact component={LoginForm} />
        </div>
    </div>
);

export default App;
