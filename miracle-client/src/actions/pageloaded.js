import * as constants from '../constants';

export const homepageloaded = state => ({
    type: constants.NEW_PAGE_LOADED,
    payload: { loadedPage: constants.HOME_PAGE }
})

export const myteampageloaded = state => ({
    type: constants.NEW_PAGE_LOADED,
    payload: { loadedPage: constants.MYTEAM_PAGE }
})

export const addnewpageloaded = state => ({
    type: constants.NEW_PAGE_LOADED,
    payload: { loadedPage: constants.ADDNEW_PAGE }
})

export const editContactPageloaded = state => ({
    type: constants.NEW_PAGE_LOADED,
    payload: { loadedPage: constants.ADDNEW_PAGE }
})