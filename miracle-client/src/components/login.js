import React from 'react';
import imglogin from '../assets/images/Logo-login.png';
import parentlogin from '../assets/images/parent-logo.png';
import loginAction from '../actions/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            emailId: '',
            password: '',
            loginStatus: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.loginAction(this.state);
    }

    render() {
        return (

            <div className="login-container">
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <div className="text-center mb-2 parent-logo">
                        <img src={parentlogin} alt="" height="80" />
                    </div>
                    <div className="text-center mb-4">
                        <img src={imglogin} alt="" height="52" />
                    </div>
                    <div className="form-label-group">
                       
                        <input
                            type="email"
                            id="inputEmail"
                            className="form-control brd-error"
                            placeholder="Email address"
                            required=""
                            autoFocus=""
                            name='emailId'
                            onChange={this.handleChange}
                            value={this.state.emailId}
                        />

                        <label htmlFor="inputEmail">Email address</label>
                        <span className="error-msg">Username Invalid</span>
                    </div>

                    <div className="form-label-group">
                        <input
                            type="password"
                            name='password'
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required=""
                            value={this.state.password}
                            onChange={this.handleChange} />
                        <label htmlFor="inputPassword">Password</label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block login-btn" type="submit">Sign in</button>
                </form>


            </div>)
    };

}

Login.propTypes = {
    loginStatus: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    loginStatus: state.login.loginStatus
})


export default connect(mapStateToProps, { loginAction })(withRouter(Login));
