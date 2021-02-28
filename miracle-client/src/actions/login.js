import * as actiontype from '../constants';
import history from '../history';
import $ from 'jquery';

const authenticationPromise = function (state) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "POST",
            url: actiontype.APIURL + 'oauth/token',
            contentType: 'application/x-www-form-urlencoded',
            data: 'grant_type=password&username=' + state.emailId + '&password=' + state.password,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });
}

const logoutPromise = (userId) => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: actiontype.APIURL + 'Account/Logout?Id=' + userId,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: function (err) {                
                reject(err)
            },
            success: function (result) {
                resolve(result);
            }
        });
    });

}


const getUserDetailPromise = () => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: actiontype.APIURL + 'Contact/GetUser',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('token'));
            },
            error: reject,
            success: function (result) {
                resolve(result);
            }
        });
    });

}

const login = state => {
    return (dispatch) => {
        dispatch({
            type: actiontype.LOADING,
        });
        authenticationPromise(state)
            .then((token) => {
                sessionStorage.setItem('token', token.access_token);
                dispatch({
                    type: actiontype.TOKEN_RECEIVED,                    
                });
                history.push("/home");
            }, (err) => {
                dispatch({
                    type: actiontype.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'Invalid credentials'
                    }
                });
            });
    }
}

export const logout = userId => {
    return (dispatch) => {
        dispatch({
            type: actiontype.LOADING,
        });
        logoutPromise(userId)
            .then((token) => {
                dispatch({
                    type: actiontype.LOGOUT,
                });
            }, (err) => {
                dispatch({
                    type: actiontype.ERROR_OCCURED,
                    payload: {
                        header: 'Server Error',
                        message: 'Internal server error'
                    }
                });
            });
    }
}

export const getUserDetail = state => {
    return (dispatch) => {
        dispatch({
            type: actiontype.LOADING,
        });
        getUserDetailPromise()
            .then((userDetails) => {
                dispatch({
                    type: actiontype.LOGIN,
                    payload: userDetails
                });
            })
    }
}

export default login;

