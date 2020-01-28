import * as actiontype from '../constants';

const getFakeLogin = () => {
    return {
        loginStatus: true,
        userId: 1,
        userName: 'Mohanraja Loganathan',
        emailId: 'se.mohanraja@gmail.com',
        location: 'Abu Dhabi',
        statusDescription: 'Active',
        statusId: 1,
        mobile: '543148158',        
        sexId: 2,
        dob: new Date('1988-05-31'),
        kpi: {},
        teamMembers: [],
        isDetailsLoaded: false
    }
}

const login = state => ({
    type: actiontype.LOGIN,
    payload: getFakeLogin()
})

export default login;