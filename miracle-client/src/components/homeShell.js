import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { loadLookup } from '../actions/homeShell';
import Home from './home';
import MyTeam from './myteam';
import AddContact from './addcontact';
import EditContact from './editcontact';
import ChangePassword from './changepassword';
import Header from './header';
import Menu from './menu';
import history from '../history';
import errorClosed from '../actions/app'

class HomeShell extends React.Component {

    constructor(props) {
        super(props);
        this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
    }

    componentWillMount() {
        this.props.loadLookup();
    }

    handleErrorMessageClose() {
        this.props.errorClosed();
    }

    render() {
        return (
            <Router history={history}>
                <Header />
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/home/myteam/:userId">
                        <MyTeam />
                    </Route>
                    <Route exact path="/home/addcontact">
                        <AddContact />
                    </Route>
                    <Route exact path="/home/editcontact">
                        <EditContact />
                    </Route>
                    <Route exact path="/home/changepassword">
                        <ChangePassword />
                    </Route>
                </Switch>
                <Menu />
            </Router>
        )
    };

}

const mapStateToProps = state => ({
    errorOccured: state.app.errorOccured,
    errorMessage: state.app.errorMessage,
    isLoggedOut: state.login.isLoggedOut,
})

export default connect(mapStateToProps, { loadLookup, errorClosed })(withRouter(HomeShell));
