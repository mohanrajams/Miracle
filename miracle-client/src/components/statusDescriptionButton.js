import React from 'react';

const getStatusClass = (statusid) => {
    switch (statusid) {
        case 4:
            return 'status active mr-10';
        case 5:
            return 'status inprogress mr-10';
        case 6:
            return 'status not-interested mr-10';
        case 7:
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
