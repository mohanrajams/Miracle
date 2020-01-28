import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import { myteampageloaded } from '../actions/pageloaded';
import { teamMemberSelected, teamMemberStatusChanged } from '../actions/myetam';
import PropTypes from 'prop-types';
import more from '../assets/images/more.png';
import TeamMemberCard from './teammembercard';
import { withRouter } from 'react-router-dom';
import StatusChangeModal from './teammemberStatusChangeModal';
import StatusDescriptionButton from './statusDescriptionButton';
import MyTeamMenu from './myteamMenu';

class MyTeam extends React.Component {

    constructor(props) {
        super(props);

        this.onTeamMemberclick = this.onTeamMemberclick.bind(this);
        this.onStatusChangeClick = this.onStatusChangeClick.bind(this);
    }

    componentWillMount() {
        this.props.myteampageloaded();
    }

    renderStatusChangeButton() {
        if (this.props.userDetails.userId === this.props.loggedInUserId) {
            return (
                <StatusDescriptionButton
                    statusId={this.props.userDetails.statusId}
                    statusDescription={this.props.userDetails.statusDescription} />);
        }
        else {
            return (
                <StatusDescriptionButton
                    statusId={this.props.userDetails.statusId}
                    statusDescription={this.props.userDetails.statusDescription}
                    shouldOpenModal={true} />
            );
        }
    }

    renderTopSection() {
        return (
            <div className="row">
                <div className="col salutation">
                    <h5>{this.props.userDetails.userName}</h5>
                    <p>{this.props.userDetails.location}</p>
                </div>
                <div className="col mt-20 d-flex justify-content-around">
                    {this.renderStatusChangeButton()}
                    <MyTeamMenu />
                </div>
            </div>
        )
    }

    renderKPISection() {
        return (
            <div className="row no-gutters">
                <div className="col">
                    <div className="kpi Total">
                        <h3>{this.props.userDetails.teamMembers.length}</h3>
                        <p>Total</p>
                    </div>
                </div>
                <div className="col">
                    <div className="kpi Inprogress">
                        <h3>{this.props.userDetails.teamMembers.filter(t => t.statusId !== 1).length}</h3>
                        <p>Inprogress</p>
                    </div>
                </div>
                <div className="col">
                    <div className="kpi Active">
                        <h3>{this.props.userDetails.teamMembers.filter(t => t.statusId === 1).length}</h3>
                        <p>Completed</p>
                    </div>
                </div>
            </div>

        )
    }

    onTeamMemberclick(member) {
        this.props.teamMemberSelected(member);
    }

    onStatusChangeClick(statusId, e) {        
        this.props.teamMemberStatusChanged({
            userDetails: this.props.userDetails,
            changedStatusId: statusId
        });
    }

    renderTeamMembersSection() {
        return (
            <div className="list">
                <ul className="row">
                    {this.props.userDetails.teamMembers.map((member) =>
                        <TeamMemberCard key={member.userId} teammeber={member} onTeamMemberclickHandler={this.onTeamMemberclick} />
                    )}
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>
                <main className="main">
                    <div className="fluid-container">
                        <div className="inner-header">
                            {this.renderTopSection()}
                            {this.renderKPISection()}
                            {this.renderTeamMembersSection()}
                            <StatusChangeModal changeStatusClickHandler={this.onStatusChangeClick}
                                status={this.props.statusLookup} />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

MyTeam.propTypes = {
    userDetails: PropTypes.object.isRequired,
    isTeamMemberSelected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    loggedInUserId: state.login.userId,
    userDetails: state.myteam.userDetails,
    statusId: state.myteam.userDetails.statusId,
    isTeamMemberSelected: state.myteam.isTeamMemberSelected,
    statusLookup: state.homeShell.status
})


export default connect(mapStateToProps,
    {
        myteampageloaded,
        teamMemberSelected,
        teamMemberStatusChanged
    })(withRouter(MyTeam));