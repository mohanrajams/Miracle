import * as actiontype from '../constants';
import history from '../history';
import $ from 'jquery';

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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                reject(errorThrown);
            },
            success: function (result) {
                resolve(result);
            }
        });
    });

}

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

const login = state => {
    return (dispatch) => {
        authenticationPromise(state)
            .then((token) => {
                sessionStorage.setItem('token', token.access_token);
                getUserDetailPromise()
                    .then((userDetails) => {                                              
                        dispatch({
                            type: actiontype.LOGIN,
                            payload: userDetails
                        });
                        history.push("/home");
                    })
            });
    }
}
export default login;