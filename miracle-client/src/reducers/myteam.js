import * as actiontype from '../constants';

const intialState = {
    isTeamMemberSelected: false,
    userDetails: { teamMembers: [] }
}

const myteamReducer = (state = intialState, action) => {
    switch (action.type) {
        case actiontype.TEAMMEMBER_SELECTED:
        case actiontype.TEAMMEMBER_STATUS_CHANGED:
        case actiontype.CONTACT_UPDATED:
        case actiontype.CONTACT_DELETED:
        case actiontype.CONTACT_ADDED:
            return Object.assign({}, state, { userDetails: action.payload, isTeamMemberSelected: true });
        case actiontype.NEW_PAGE_LOADED:
            if (action.payload.loadedPage === actiontype.ADDNEW_PAGE) {
                return Object.assign({}, state, { isTeamMemberSelected: false });
            }
            else {
                return state;
            }
        case actiontype.LOGOUT:
            return Object.assign({}, state, intialState);
        default:
            return state;
    }
}

export default myteamReducer;