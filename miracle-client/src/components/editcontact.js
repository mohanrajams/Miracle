import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editContactPageloaded } from '../actions/pageloaded';
import { contactUpdated } from '../actions/contact';
import { required, email, requiredWhenUserActive, emailWhenActive } from '../validation'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import moment from 'moment';
import 'moment-timezone';

class EditContact extends React.Component {

    constructor(props) {
        super(props);

        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        this.state = {
            loginStatus: false,
            userId: this.props.userDetails.userId,
            userName: this.props.userDetails.userName,
            emailId: this.props.userDetails.emailId,
            location: this.props.userDetails.location,
            statusDescription: this.props.userDetails.statusDescription,
            statusId: this.props.userDetails.statusId,
            mobile: this.props.userDetails.mobile,
            sexId: this.props.userDetails.sexId,
            dob: moment(this.props.userDetails.dob).tz(timezone).format('YYYY-MM-DD'),
            contactId: this.props.userDetails.contactId,
            teamMembers: this.props.userDetails.teamMembers,
            isDetailsLoaded: this.props.userDetails.isDetailsLoaded
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderSexDropDown = this.renderSexDropDown.bind(this);
    }

    componentWillMount() {
        this.props.editContactPageloaded();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit(e) {
        e.preventDefault();
        if (this.hasError() === false) {
            this.props.contactUpdated(this.state);
        }
    };

    hasError() {
        this.form.validateAll();
        return Object.values(this.form.state.byId)
            .filter(o => Object.keys(o).filter(p => p === 'error').length).length > 0;
    }

    renderSexDropDown(props) {
        return (
            <select className="form-control"
                value={this.state.sexId} name="sexId"
                onChange={(e) => this.handleChange(e)}>
                {
                    props.sexLookup.map((sex) => {
                        return <option key={sex.sexId} value={sex.sexId}>{sex.sexDescription}</option>
                    })
                }
            </select>
        );
    }

    renderContactView() {
        return (
            <main className="main">
                <div className="fluid-container">
                    <Form onSubmit={this.handleSubmit} ref={c => { this.form = c }}>
                        <div className="row addnew">
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">Full Name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.userName} name="userName"
                                    onChange={(e) => this.handleChange(e)}
                                    validations={[required]} />
                            </div>
                            <div className="col-sm-6 mx-20 form-group">
                                <label htmlFor="">Gender</label>
                                {this.renderSexDropDown(this.props)}
                            </div>
                            <div className="col-sm-6 mx-20 form-group">
                                <label htmlFor="">Date of Birth</label>
                                <Input
                                    type="date"
                                    className="form-control"
                                    value={this.state.dob}
                                    name="dob"
                                    onChange={(e) => this.handleChange(e)}
                                    validations={[required]} />
                            </div>
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">City</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.location}
                                    name="location"
                                    onChange={(e) => this.handleChange(e)}
                                    validations={[required]} />
                            </div>
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">Mobile Number</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.mobile}
                                    name="mobile"
                                    onChange={(e) => this.handleChange(e)}
                                    validations={[required]} />
                            </div>
                            <div className="col-md-12 mx-20 form-group">
                                <label htmlFor="">Email Id</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    value={this.state.emailId}
                                    name="emailId"
                                    onChange={(e) => this.handleChange(e)}
                                    statusId={this.state.statusId}
                                    validations={[requiredWhenUserActive, emailWhenActive]} />
                            </div>
                            <div className="col-md-12 mx-20 form-group">
                                <button className="btn btn-custom mt-20">Update Contact</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </main>
        );
    }

    render() {
        return (
            this.renderContactView()
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
