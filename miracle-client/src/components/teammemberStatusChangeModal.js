import '../assets/css/bootstrap.min.css';
import '../assets/css/main.css';
import React from 'react';

const ChangeStatusModal = (props) => {
    return (
        <div className="modal fade" id="Status" tabIndex="-1" role="dialog">
            <div className="modal-dialog" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title">Change Status</h6>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="selectstatus">
                            {
                                props.status.map(s => {
                                    return <li key={s.statusId} onClick={e => props.changeStatusClickHandler(s.statusId, e)} data-dismiss="modal"><a href="#">{s.statusDescription}</a></li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeStatusModal;
