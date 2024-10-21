import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../actions/login';

class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ispageloaded: false
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleLogout() {
        this.props.logout(this.props.userId);
    }

    handleChangePassword() {
        this.props.history.push("/home/changepassword");
    }

    render() {
        return (
            <div className="modal fade" id="mainnav" tabIndex="-1" role="dialog" aria-labelledby="mainnav" aria-hidden="true">
                <div className="modal-dialog modal-dialog-slideout" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <h5>{this.props.userName}</h5>
                                <p>{this.props.emailId}</p>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="selectstatus">
                                <li><a href="#">My Profile</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a data-dismiss="modal" onClick={this.handleChangePassword}>Change Password</a></li>
                                <li><a data-dismiss="modal" onClick={this.handleLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

Menu.propTypes = {
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    emailId: PropTypes.string.isRequired    
};

const mapStateToProps = state => ({
    userId: state.login.userId,
    userName: state.login.userName,
    emailId: state.login.emailId
})

export default connect(mapStateToProps, { logout })(withRouter(Menu));
