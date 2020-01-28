import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';

const getStatusClass = (statusid) => {
    switch (statusid) {
        case 1:
            return 'status active mr-10';
        case 2:
            return 'status inprogress mr-10';
        case 3:
            return 'status not-interested mr-10';
        case 4:
            return 'status not-interested mr-10';
        default:
            return 'status active mr-10';
    }
}

const StatusDescriptionButton = (props) => {
    if (props.shouldOpenModal === true) {
        return (
            <button className={getStatusClass(props.statusId)} data-toggle="modal" data-target="#Status">{props.statusDescription}</button>                        
        );
    }
    else {
        return (
            <div className={getStatusClass(props.statusId)}>{props.statusDescription}</div>
        );
    }
}

export default StatusDescriptionButton;
