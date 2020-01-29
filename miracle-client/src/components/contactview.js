import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';

const renderSexDropDown = (props) => {
    return (
        <select className="form-control" value={props.userDetails.sexId} name="sexId" onChange={(e) => props.onValueChangeHandler(e)}>
            {
                props.sexLookup.map((sex) => {
                    return <option key={sex.sexId} value={sex.sexId}>{sex.sexDescription}</option>
                })
            }
        </select>
    );
}

const ContactView = (props) => {
    return (
        <main className="main">
            <div className="fluid-container">
                <form onSubmit={(e) => { props.onSubmitHandler(e) }}>
                    <div className="row addnew">
                        <div className="col-md-12 mx-20 form-group">
                            <label htmlFor="">Full Name</label>
                            <input type="text" className="form-control" value={props.userDetails.userName} name="userName" onChange={(e) => props.onValueChangeHandler(e)} />
                        </div>
                        <div className="col-sm-6 mx-20 form-group">
                            <label htmlFor="">Gender</label>
                            {renderSexDropDown(props)}
                        </div>
                        <div className="col-sm-6 mx-20 form-group">
                            <label htmlFor="">Date of Birth</label>
                            <input type="date" className="form-control" defaultValue={props.userDetails.dob} name="dob" onChange={(e) => props.onValueChangeHandler(e)} />
                        </div>
                        <div className="col-md-12 mx-20 form-group">
                            <label htmlFor="">City</label>
                            <input type="text" className="form-control" value={props.userDetails.location} name="location" onChange={(e) => props.onValueChangeHandler(e)} />
                        </div>
                        <div className="col-md-12 mx-20 form-group">
                            <label htmlFor="">Mobile Number</label>
                            <input type="text" className="form-control" value={props.userDetails.mobile} name="mobile" onChange={(e) => props.onValueChangeHandler(e)} />
                        </div>
                        <div className="col-md-12 mx-20 form-group">
                            <label htmlFor="">Email Id</label>
                            <input type="text" className="form-control" value={props.userDetails.emailId} name="emailId" onChange={(e) => props.onValueChangeHandler(e)} />
                        </div>
                        <div className="col-md-12 mx-20 form-group">
                            <button className="btn btn-custom mt-20">{props.actionText}</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default ContactView;
