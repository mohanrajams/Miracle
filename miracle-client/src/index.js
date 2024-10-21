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
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App mypersistor={persistor} />
    </PersistGate>
</Provider>, document.getElementById('root'));
//serviceWorker.register();