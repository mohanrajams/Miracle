import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Menu extends React.Component {

    constructor(props) {
        super(props);
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
                                <li><a href="#">Change Password</a></li>
                                <li><a href="#">Logout</a></li>
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


export default connect(mapStateToProps)(withRouter(Menu));
