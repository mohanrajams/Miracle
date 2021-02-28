import * as actiontype from '../constants';

const intialState = {
    isPasswordChanged: false
}

const changePasswordReducer = (state = intialState, action) => {
    switch (action.type) {
        case actiontype.LOGOUT:
            return Object.assign({}, state, { isPasswordChanged: false });
        case actiontype.PASSWORDCHANGED:
            return Object.assign({}, state, { isPasswordChanged: true });
        default:
            return state;
    }
}

export default changePasswordReducer;