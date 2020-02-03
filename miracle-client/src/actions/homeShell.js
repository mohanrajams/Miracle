import * as constants from '../constants';
import $ from 'jquery';

const getLookupPromise = () => {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: constants.APIURL + 'Lookup/GetLookup',
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

export const loadLookup = state => {
    return (dispatch) => {
        getLookupPromise(state)
            .then((lookup) => {
                dispatch({
                    type: constants.LOAD_LOOKUP,
                    payload: lookup
                });
            });
    }
}

