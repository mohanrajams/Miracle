import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addnewpageloaded } from '../actions/pageloaded';
import { contactAdded } from '../actions/contact';
import ContactView from './contactview';

class AddContact extends React.Component {

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
        this.props.addnewpageloaded();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();        
        this.props.contactAdded(this.state);     
    };

    render() {
        return (
            <ContactView
                userDetails={{}}
                sexLookup={this.props.sexLookup}
                onValueChangeHandler={this.handleChange}
                onSubmitHandler={this.handleSubmit}
                actionText="Add Contact" />
        );
    }
}

AddContact.propTypes = {
    sexLookup: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    sexLookup: state.homeShell.sex
})


export default connect(mapStateToProps, { addnewpageloaded, contactAdded })(withRouter(AddContact));
