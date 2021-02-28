import React from 'react';

const getCssClass = (props) => {
    if (props.isErrorOccured === true) {
        return "alert alert-danger fade show server-er";
    } else {
        return "alert alert-danger fade show server-er d-none";
    }
}

const errorMessage = (props) => {
    return (
        <div className={getCssClass(props)} role="alert" style={{ zIndex: 2000 }}>
            <strong>{props.errorMessage.header + ": "}</strong>{props.errorMessage.message}
            <button type="button" className="close" aria-label="Close" onClick={(e) => { props.closeButtonHandler(e) }} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

export default errorMessage;