import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import { homepageloaded } from '../actions/pageloaded';
import { teamMemberSelected } from '../actions/myetam';
import logo from '../assets/images/Logo-login.png';
import team from '../assets/images/team.png';
import miracle from '../assets/images/miracle.png';
import contest from '../assets/images/contest.png';
import shop from '../assets/images/shop.png';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.homepageloaded();
        this.handleMyTeamClick = this.handleMyTeamClick.bind(this);
    }

    handleMyTeamClick() {
        this.props.teamMemberSelected(this.props.userDetails);
        this.props.history.push("/home/myteam");
    }

    renderUserName() {
        return (
            <div className="top-header">
                <div className="row">
                    <div className="col salutation">
                        <p>Welcome</p>
                        <h5>{this.props.userDetails.userName}</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col logo">
                        <img className="" height="30" src={logo} />
                    </div>
                </div>

            </div>
        );
    }

    renderOptionSection() {
        return (
            <div className="row home-nav">
                <div className="col">
                    <button className="item btn-block" onClick={this.handleMyTeamClick} >
                        <img className="img-fluid" src={team} />
                        <p>My Team </p>
                    </button>
                </div>
                <div className="col">
                    <button className="item btn-block">
                        <img className="img-fluid" src={miracle} />
                        <p>Team Miracle </p>
                    </button>
                </div>
                <div className="w100"></div>
                <div className="col mt-3">
                    <button className="item btn-block">
                        <img className="img-fluid" src={contest} />
                        <p>Contest</p>
                    </button>
                </div>
                <div className="col mt-3">
                    <button className="item btn-block">
                        <img className="img-fluid" src={shop} />
                        <p>Shop </p>
                    </button>
                </div>
            </div>)
    }

    renderBottomSection() {
        return (
            <div className="white-wrap">
                <div className="row nav-list">
                    <ul className="col">
                        <li><button className="rank">Ranks</button></li>
                        <li><button className="acheiver">Acheivers</button></li>
                        <li><button className="location">Program Centers</button></li>
                        <li><button className="dwl">Downloads</button></li>
                        <li><button className="contact">Contact Us</button></li>
                    </ul>
                </div>
            </div>)
    }

    render() {
        return (
            <div>
                <main className="main">
                    <div className="fluid-container">
                        {this.renderUserName()}
                        {this.renderOptionSection()}
                        {this.renderBottomSection()}
                    </div>
                </main>
            </div>
        )
    };

}

Home.propTypes = {
    userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userDetails: state.login
})


export default connect(mapStateToProps, { homepageloaded, teamMemberSelected })(withRouter(Home));
