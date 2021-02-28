import * as constants from '../constants';

const intialState = {
    title: '',
    loadedPage: '',
    currentSelectedTeamMember: {},
    previouseSelecteTeamMember: []
}

const getTitle = function (page) {
    switch (page) {
        case constants.HOME_PAGE:
            return '';
        case constants.MYTEAM_PAGE:
            return 'My Team';
        case constants.ADDNEW_PAGE:
            return 'Add New';
        case constants.EDIT_PAGE:
            return 'Edit Contact';
        case constants.CHANGEPASSWORD_PAGE:
            return 'Change Password';
        default:
            return '';
    }
}

const headerReducer = (state = intialState, action) => {
    switch (action.type) {
        case constants.NEW_PAGE_LOADED:
            return Object.assign({}, state, { title: getTitle(action.payload.loadedPage), loadedPage: action.payload.loadedPage });
        case constants.LOGOUT:
            return Object.assign({}, state, intialState);
        default:
            return state;
    }
}

export default headerReducer;