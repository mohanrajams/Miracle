import * as actiontype from '../constants';

const intialState = {
    loading: false,
    errorOccured: false,
    errorMessage: {
        header: '',
        message: ''
    }
}

const myteamReducer = (state = intialState, action) => {
    switch (action.type) {
        case actiontype.TEAMMEMBER_SELECTED:
        case actiontype.TEAMMEMBER_STATUS_CHANGED:
        case actiontype.CONTACT_UPDATED:
        case actiontype.CONTACT_DELETED:
        case actiontype.CONTACT_DELETED:
        case actiontype.LOGIN:
        case actiontype.LOAD_LOOKUP:
        case actiontype.LOGOUT:
        case actiontype.PASSWORDCHANGED:
            return Object.assign({}, state, intialState);
        case actiontype.LOADING:
            return Object.assign({}, state, { loading: true });
        case actiontype.ERROR_OCCURED:
            return Object.assign({}, state, { errorOccured: true, errorMessage: action.payload, loading: false });
        case actiontype.ERROR_CLOSED:
            return Object.assign({}, state, {
                errorOccured: false, errorMessage: {
                    header: '',
                    message: ''
                }
            });
        default:
            return state;
    }
}

export default myteamReducer;