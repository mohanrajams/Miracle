import './assets/css/bootstrap.min.css';
import './assets/css/main.css';
import $ from 'jquery';
import './assets/js/popper.min.js';
import './assets/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Store from './store';

ReactDOM.render(<Provider store={Store}>
    <App />
</Provider>, document.getElementById('root'));
