import React from 'react';
import { Route } from 'react-router-dom';

import SignupForm from './containers/signup_form';
import LoginPage from './components/pages/login_page';
import NavbarComponent from './components/navbar_component';

const App = () => (
    <div>
        <NavbarComponent />
        <div className = "container">
            <Route path="/" exact component={LoginPage} />
            <Route path="/signup" exact component={SignupForm} />
            <Route path="/login" exact component={LoginPage} />
        </div>
    </div>
);

export default App;
