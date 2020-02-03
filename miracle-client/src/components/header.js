import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import menuIcon from '../assets/images/menu-button.svg';
import notificationIcon from '../assets/images/Notification.svg';
import leftArrow from '../assets/images/left-arrow.svg';
import * as constants from '../constants';
import { teamMemberSelectedBack } from '../actions/myetam';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    back() {           
        if (this.props.loadedPage === constants.MYTEAM_PAGE && this.props.previouseSelecteTeamMember.length > 0) {        
            this.props.teamMemberSelectedBack(this.props.previouseSelecteTeamMember[0]);
        }
        else {
            this.props.history.goBack();
        }
    }

    renderLeftButton() {
        if (this.props.loadedPage === constants.HOME_PAGE || this.props.loadedPage === '') {
            return (
                <button className="main-nav" data-toggle="modal" data-target="#mainnav">
                    <img src={menuIcon} style={{ width: 25 }} />
                </button>
            );
        }
        else {
            return (
                <button className="main-nav">
                    <img src={leftArrow} style={{ width: 25 }} onClick={this.back} />
                </button>
            );
        }
    }

    renderTitle() {
        if (this.props.loadedPage === constants.HOME_PAGE || this.props.loadedPage === '') {
            return <div></div>
        }
        else {
            return <a className="navbar-brand" href="#">{this.props.title}</a>
        }
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    {this.renderLeftButton()}
                    {this.renderTitle()}
                    <button className="notification">
                        <img src={notificationIcon} style={{ width: 25 }} />
                    </button>
                </nav>
            </header>
        );
    }
}

Header.propTypes = {
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    emailId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    loadedPage: PropTypes.string.isRequired,
    previouseSelecteTeamMember: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    userId: state.login.userId,
    userName: state.login.userName,
    emailId: state.login.emailId,
    title: state.header.title,
    loadedPage: state.header.loadedPage,
    previouseSelecteTeamMember: state.header.previouseSelecteTeamMember
})


export default connect(mapStateToProps, { teamMemberSelectedBack })(withRouter(Header));
