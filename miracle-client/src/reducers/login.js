import * as actiontype from '../constants';

const intialState = {
    loginStatus: false,
    userId: 0,
    userName: '',
    emailId: '',
    location: '',
    statusDescription: '',
    statusId: 0,
    mobile: '',
    sexId: 1,
    dob: new Date(),    
    teamMembers: [],
    isDetailsLoaded: false,
    accessToken: ''
}

const loginReducer = (state = intialState, action) => {
    switch (action.type) {
        case actiontype.LOGIN:
            return Object.assign({}, state, action.payload);
        case actiontype.CONTACT_ADDED:
            state.teamMembers.push(action.payload);
            return Object.assign({}, state)
        default:
            return state;
    }
}

export default loginReducer;