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
        default:
            return '';
    }
}

const headerReducer = (state = intialState, action) => {
    switch (action.type) {
        case constants.NEW_PAGE_LOADED:
            return Object.assign({}, state, { title: getTitle(action.payload.loadedPage), loadedPage: action.payload.loadedPage });
        case constants.TEAMMEMBER_SELECTED:
            if (Object.keys(state.currentSelectedTeamMember).length > 0) {
                return Object.assign({}, state, {
                    previouseSelecteTeamMember: [state.currentSelectedTeamMember, ...state.previouseSelecteTeamMember],
                    currentSelectedTeamMember: action.payload
                });
            }
            else {
                return Object.assign({}, state, {
                    currentSelectedTeamMember: action.payload
                })
            }
        case constants.TEAMMEMBER_SELECTED_BACK:
            state.previouseSelecteTeamMember.shift()
            return Object.assign({},state,{currentSelectedTeamMember:action.payload});            
        default:
            return state;
    }
}

export default headerReducer;