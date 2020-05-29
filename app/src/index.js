import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import config from './app.config';
function onAuthRequired({ history }) {
    history.push('/login');
}

ReactDOM.render(
    <Router>
        <App/>
    </Router>, document.getElementById('root'));