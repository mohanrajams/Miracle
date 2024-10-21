import React from 'react';
import Login from './components/login';
import HomeShell from './components/homeShell';
import history from './history';
import Loader from './components/loader';
import ErrorMessage from './components/error';
import { connect } from 'react-redux';
import errorClosed from './actions/app'

import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import localStorage from 'redux-persist/es/storage';

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
  }

  handleErrorMessageClose() {
    this.props.errorClosed();
  }

  renderErrorMessage() {
    return (<ErrorMessage isErrorOccured={this.props.errorOccured} errorMessage={this.props.errorMessage} closeButtonHandler={this.handleErrorMessageClose} />)
  }

  renderHome() {
    if (this.props.loginStatus === false) {
      history.push("/");
      sessionStorage.clear();
      this.props.mypersistor.purge();
      return (<Login />);
    }
    else {
      return (<HomeShell />)
    }
  }

  render() {
    return (
      <div>      
        {this.renderErrorMessage()}  
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/home">
              {this.renderHome()}
            </Route>
          </Switch>
        </Router>        
        <Loader isLoading={this.props.isLoading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.app.loading,
  errorOccured: state.app.errorOccured,
  errorMessage: state.app.errorMessage,
  loginStatus: state.login.loginStatus
})

export default connect(mapStateToProps, { errorClosed })(App);
