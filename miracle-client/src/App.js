import React from 'react';
import Login from './components/login';
import HomeShell from './components/homeShell';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>      
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <HomeShell />
          </Route>
        </Switch>    
    </Router>
  );
}

export default App;
