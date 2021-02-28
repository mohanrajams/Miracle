import * as constants from '../constants';
import $ from 'jquery';
import history from '../history';

const getTeamMembersPromise = (userId) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: constants.APIURL + 'Contact/GetUser?id=' + userId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
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

const updateStatusPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: constants.APIURL + 'Contact/UpdateStatus',
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

export const teamMemberSelected = state => {
    return (dispatch) => {
        dispatch({
            type: constants.TEAMMEMBER_SELECTED,
            payload: state
        });
        history.push("/home/myteam/" + state.userId);
    };
}

export const teamMemberStatusChanged = state => {
    return (dispatch) => {
        updateStatusPromise(state)
            .then((teamMember) => {
                dispatch({
                    type: constants.TEAMMEMBER_STATUS_CHANGED,
                    payload: teamMember
                });
            }, (err) => {
                dispatch({
                    type: constants.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'EmailId needs to be updated'
                    }
                });
            });
    }
}

export const loadTeamMembers = userId => {
    return (dispatch) => {
        dispatch({
            type: constants.LOADING,
        });
        getTeamMembersPromise(userId)
            .then((result) => {
                dispatch({
                    type: constants.TEAMMEMBER_SELECTED,
                    payload: result
                });
            });
    }
}