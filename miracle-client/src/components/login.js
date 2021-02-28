import React from 'react';
import imglogin from '../assets/images/Logo-login.png';
import parentlogin from '../assets/images/parent-logo.png';
import loginAction from '../actions/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required, email } from '../validation'

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
        this.hasError = this.hasError.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    hasError() {
        this.form.validateAll();
        return Object.values(this.form.state.byId)
            .filter(o => Object.keys(o).filter(p => p === 'error').length).length > 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.hasError() === false) {
            this.props.loginAction(this.state);
        }
    }

    render() {
        return (

            <div className="login-container">
                <Form className="form-signin" onSubmit={this.handleSubmit} ref={c => { this.form = c }}>
                    <div className="text-center mb-2 parent-logo">
                        <img src={parentlogin} alt="" height="80" />
                    </div>
                    <div className="text-center mb-4">
                        <img src={imglogin} alt="" height="52" />
                    </div>
                    <div className="form-label-group">

                        <Input
                            type="email"
                            id="inputEmail"
                            className="form-control"
                            placeholder="Email address"
                            required=""
                            autoFocus=""
                            name='emailId'
                            onChange={this.handleChange}
                            value={this.state.emailId}
                            validations={[email]}
                        />

                        {/* <label htmlFor="inputEmail">Email address</label> */}
                    </div>

                    <div className="form-label-group">
                        <Input
                            type="password"
                            name='password'
                            id="inputPassword"
                            className="form-control"
                            placeholder="Password"
                            required=""
                            value={this.state.password}
                            onChange={this.handleChange}
                            validations={[required]} />
                        {/* <label htmlFor="inputPassword">Password</label> */}
                    </div>

                    <button className="btn btn-lg btn-primary btn-block login-btn" type="submit">Sign in</button>
                </Form>
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
