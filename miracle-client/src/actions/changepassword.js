import * as constants from '../constants';
import $ from 'jquery';

const changePasswordPromise = (state) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: constants.APIURL + 'Account/ChangePassword',
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

export const changePassword = state => {
    return (dispatch) => {
        dispatch({
            type: constants.LOADING,
        });
        changePasswordPromise(state)
            .then(() => {
                dispatch({
                    type: constants.PASSWORDCHANGED
                });
            }, (err) => {
                dispatch({
                    type: constants.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'Old password does not match'
                    }
                });
            });
    }
}

