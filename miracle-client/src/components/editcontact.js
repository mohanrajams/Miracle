import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editContactPageloaded } from '../actions/pageloaded';
import { contactUpdated } from '../actions/contact';
import ContactView from './contactview';

class EditContact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginStatus: false,
            userId: 0,
            userName: '',
            emailId: '',
            location: '',
            statusDescription: 'Not Started',
            statusId: 3,
            mobile: '',
            sexId: 0,
            dob: new Date(),
            kpi: {},
            teamMembers: [],
            isDetailsLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.editContactPageloaded();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.contactUpdated(this.state);
        this.props.history.push("/home/myteam");
    };

    render() {
        return (
            <ContactView
                userDetails={this.props.userDetails}
                sexLookup={this.props.sexLookup}
                onValueChangeHandler={this.handleChange}
                onSubmitHandler={this.handleSubmit}
                actionText="Update Contact" />
        );
    }
}

EditContact.propTypes = {
    sexLookup: PropTypes.array.isRequired,
    userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    sexLookup: state.homeShell.sex,
    userDetails: state.myteam.userDetails
})


export default connect(mapStateToProps, { contactUpdated, editContactPageloaded })(withRouter(EditContact));
