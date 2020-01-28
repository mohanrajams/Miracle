import * as actiontype from '../constants';

const intialState = {
    status: [],
    sex: []
}

const homeShellReducer = (state = intialState, action) => {
    switch (action.type) {
        case actiontype.LOAD_LOOKUP:
            return Object.assign({}, state, { status: action.payload.status, sex: action.payload.sex });
        default:
            return state;
    }
}

export default homeShellReducer;