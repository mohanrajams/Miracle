import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { loadLookup } from '../actions/homeShell';
import Home from './home';
import MyTeam from './myteam';
import AddContact from './addcontact';
import EditContact from './editcontact';
import Header from './header';
import Menu from './menu';


class HomeShell extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadLookup();
    }

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path="/home/myteam">
                        <MyTeam />
                    </Route>
                    <Route exact path="/home/addcontact">
                        <AddContact />
                    </Route>
                    <Route exact path="/home/editcontact">
                        <EditContact />
                    </Route>
                </Switch>
                <Menu />
            </Router>
        )
    };

}

export default connect(null, { loadLookup })(withRouter(HomeShell));