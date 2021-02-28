import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { changePasswordPageloaded } from '../actions/pageloaded';
import { required, password, minlength, maxlength } from '../validation'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import successimage from '../assets/images/success.png';
import { logout } from '../actions/login';
import { changePassword } from '../actions/changepassword';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasError = this.hasError.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.props.changePasswordPageloaded();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleLogout(e) {
        e.preventDefault();
        this.props.logout(this.props.userId);
    }

    hasError() {
        this.form.validateAll();
        return Object.values(this.form.state.byId)
            .filter(o => Object.keys(o).filter(p => p === 'error').length).length > 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.hasError() === false) {
            this.props.changePassword(this.state);
        }
    };

    renderChangePasswordForm() {
        return (
            <main className="main">
                <div className="fluid-container">
                    <Form onSubmit={this.handleSubmit} ref={c => { this.form = c }}>
                        <div className="row addnew">
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">Old Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    value={this.state.oldPassword} name="oldPassword"
                                    onChange={(e) => this.handleChange(e)}
                                    validations={[required]} />
                            </div>
                        </div>
                        <div className="row addnew">
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">New Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    value={this.state.newPassword} name="newPassword"
                                    onChange={(e) => this.handleChange(e)}
                                    minlength='8'
                                    maxlength='15'
                                    validations={[required, minlength, maxlength]} />
                            </div>
                        </div>
                        <div className="row addnew">
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">Confirm Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    value={this.state.confirmPassword} name="confirmPassword"
                                    onChange={(e) => this.handleChange(e)}
                                    newPasswordControlName='newPassword'
                                    minlength='8'
                                    maxlength='15'
                                    validations={[required, password, minlength, maxlength]} />
                            </div>
                        </div>
                        <div className="col-md-12 mx-20 form-group">
                            <button className="btn btn-custom mt-20">Change Password</button>
                        </div>
                    </Form>
                </div>
            </main>);
    }

    renderChangePasswordSuccess() {
        return (
            <main className="main">
                <div className="fluid-container">
                    <div className="row addnew">
                        <div className="col-md-12 mx-125">
                            <img className="img-fluid changepasswordsuccess" src={successimage} />
                        </div>
                    </div>
                    <div className="row addnew">
                        <div className="col-md-12 mx-20">
                            <span>Password changed successfully.
                            When you click on ok button you will be logged out.
                                 Please login with new password</span>
                        </div>
                    </div>
                    <div className="row addnew">
                        <div className="col-md-12 mx-125">
                            <button className="btn btn-custom mt-20 okbutton" onClick={this.handleLogout}>Ok</button>
                        </div>
                    </div>
                </div>
            </main>)
    }

    render() {
        if (this.props.isPasswordChanged === true) {
            return (this.renderChangePasswordSuccess())
        }
        else {
            return (this.renderChangePasswordForm())
        }
    }
}

ChangePassword.propTypes = {
    userId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    userId: state.login.userId,
    isPasswordChanged: state.changepassword.isPasswordChanged
})


export default connect(mapStateToProps, { changePasswordPageloaded, logout, changePassword })(withRouter(ChangePassword));
