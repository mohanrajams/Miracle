import React from 'react';
import user from '../assets/images/user.png';
import StatusDescriptionButton from './statusDescriptionButton';

const TeamMemberCard = (props) => {    
    return (
        <li className="col-md-12  d-flex" onClick={() => props.onTeamMemberclickHandler(props.teammeber)}>
            <div className="userdetails">
                <img height="50" src={user} />
                <div className="details">
                    <h5>{props.teammeber.userName}</h5>
                    <p>{props.teammeber.location}</p>
                </div>
            </div>
            <StatusDescriptionButton statusId={props.teammeber.statusId} statusDescription={props.teammeber.statusDescription}/>
        </li>
    );
}

export default TeamMemberCard;
