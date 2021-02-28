import * as constants from '../constants';
import $ from 'jquery';
import history from '../history';

const addContactPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: constants.APIURL + 'Contact/AddContact',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(state),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });
}

const updateContactPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: constants.APIURL + 'Contact/UpdateContact',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(state),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });
}

const deleteContactPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: constants.APIURL + 'Contact/DeleteContact',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(state),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });
}

const getTeamMembersPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: constants.APIURL + 'Contact/GetChildContacts?id=' + state.userId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(XMLHttpRequest.statusText);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });
}

export const contactAdded = state => {
    return (dispatch) => {
        dispatch({
            type: constants.LOADING,
        });
        addContactPromise(state)
            .then((contact) => {
                dispatch({
                    type: constants.CONTACT_ADDED,
                    payload: contact
                });
                history.goBack();
            }, (err) => {
                dispatch({
                    type: constants.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'EmailId or Mobile number already exists'
                    }
                });
            });
    }
}

export const contactUpdated = state => {
    return (dispatch) => {
        dispatch({
            type: constants.LOADING,
        });
        updateContactPromise(state)
            .then((contact) => {
                dispatch({
                    type: constants.CONTACT_UPDATED,
                    payload: contact
                });
                history.goBack();
            }, (err) => {
                dispatch({
                    type: constants.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'EmailId or Mobile number already exists'
                    }
                });
            });
    }
}

export const contactDeleted = state => {
    return (dispatch) => {
        dispatch({
            type: constants.LOADING,
        });
        deleteContactPromise(state.userDetails)
            .then((contact) => {
                dispatch({
                    type: constants.CONTACT_DELETED,
                    payload: state.loggedInUserDetails
                });
                history.goBack();
            });
    }
}
