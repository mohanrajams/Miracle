import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import more from '../assets/images/more.png';
import { Link } from "react-router-dom";

class MyTeamMenu extends React.Component {

    constructor(props) {
        super(props);
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
                        <a className="dropdown-item" href="#">Make a Call </a>
                        <Link className="dropdown-item" to="/home/editcontact">Edit Details</Link>
                        <a className="dropdown-item" href="#">Delete</a>
                    </div>
                </div>
            );
        }
    };

}

MyTeamMenu.propTypes = {
    loggedInUserId: PropTypes.number.isRequired,
    userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loggedInUserId: state.login.userId,
    userDetails: state.myteam.userDetails
})


export default connect(mapStateToProps)(withRouter(MyTeamMenu));
