import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import more from '../assets/images/more.png';
import { Link } from "react-router-dom";
import { contactDeleted } from '../actions/contact';

class MyTeamMenu extends React.Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }


    onDeleteClick() {        
        this.props.contactDeleted({
            loggedInUserDetails: this.props.loggedInUserDetails,
            userDetails: this.props.userDetails
        });
    }

    render() {    
        if (this.props.loggedInUserId === this.props.userDetails.userId) {
            return (
                <div className="dropdown">
                    <button className="nobtn" type="button" id="01" data-toggle="dropdown" aria-expanded="false">
                        <img width="20px" src={more} />
                    </button>
                    <div className="dropdown-menu" aria-labelledby="01">
                        <Link className="dropdown-item" to="/home/addcontact">Add Contact </Link>
                        <Link className="dropdown-item" to="/home/editcontact">Edit Details</Link>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="dropdown">
                    <button className="nobtn" type="button" id="01" data-toggle="dropdown" aria-expanded="false">
                        <img width="20px" src={more} />
                    </button>
                    <div className="dropdown-menu" aria-labelledby="01">
                        <a className="dropdown-item" href={'tel:'+this.props.userDetails.mobile}>Make a Call </a>
                        <Link className="dropdown-item" to="/home/editcontact">Edit Details</Link>
                        <button className="dropdown-item" onClick={this.onDeleteClick} href="#">Delete</button>
                    </div>
                </div>
            );
        }
    };

}

MyTeamMenu.propTypes = {
    loggedInUserId: PropTypes.number.isRequired,
    userDetails: PropTypes.object.isRequired,
    loggedInUserDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedInUserId: state.login.userId,
    userDetails: state.myteam.userDetails,
    loggedInUserDetails: state.login
})


export default connect(mapStateToProps, { contactDeleted })(withRouter(MyTeamMenu));
