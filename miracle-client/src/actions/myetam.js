import * as constants from '../constants';


const getFakeData = (state) => {

    if (state.userId === 1) {

        state.teamMembers = [
            {
                loginStatus: false,
                userId: 2,
                userName: 'Test1',
                emailId: 'Test1@gmail.com',
                location: 'Sharjah',
                statusDescription: 'Active',
                statusId: 1,
                mobile: '543148159',
                sexId: 2,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            },
            {
                loginStatus: false,
                userId: 3,
                userName: 'Test2',
                emailId: 'Test2@gmail.com',
                location: 'Dubai',
                statusDescription: 'In Progress',
                statusId: 2,
                mobile: '543148160',
                sexId: 1,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            },
            {
                loginStatus: false,
                userId: 4,
                userName: 'Test3',
                emailId: 'Test3@gmail.com',
                location: 'Aj man',
                statusDescription: 'Not Intreseted',
                statusId: 3,
                mobile: '543148161',
                sexId: 2,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            }
            ,
            {
                loginStatus: false,
                userId: 5,
                userName: 'Test4',
                emailId: 'Test4@gmail.com',
                location: 'Aj man',
                statusDescription: 'Not Intreseted',
                statusId: 3,
                mobile: '543148162',
                sexId: 1,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            }
        ];

        state.isDetailsLoaded = true;

        return state;
    }
    else if (state.userId === 2) {

        state.teamMembers = [
            {
                loginStatus: false,
                userId: 10,
                userName: 'Test1 Child1',
                emailId: 'Test1Child1@gmail.com',
                location: 'Sharjah',
                statusDescription: 'Active',
                statusId: 1,
                mobile: '543148159',
                sexId: 2,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            },
            {
                loginStatus: false,
                userId: 11,
                userName: 'Test1 Child2',
                emailId: 'Test2@gmail.com',
                location: 'Dubai',
                statusDescription: 'In Progress',
                statusId: 2,
                mobile: '543148160',
                sexId: 1,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            },
            {
                loginStatus: false,
                userId: 12,
                userName: 'Test1 Child3',
                emailId: 'Test3@gmail.com',
                location: 'Aj man',
                statusDescription: 'Not Intreseted',
                statusId: 3,
                mobile: '543148161',
                sexId: 2,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            }
            ,
            {
                loginStatus: false,
                userId: 13,
                userName: 'Test1 Child4',
                emailId: 'Test4@gmail.com',
                location: 'Aj man',
                statusDescription: 'Not Intreseted',
                statusId: 3,
                mobile: '543148162',
                sexId: 1,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            }
        ];

        state.isDetailsLoaded = true;

        return state;
    }
    else if (state.userId === 13) {

        state.teamMembers = [
            {
                loginStatus: false,
                userId: 10,
                userName: 'Test1 Child4 Child1',
                emailId: 'Test1Child1@gmail.com',
                location: 'Sharjah',
                statusDescription: 'Active',
                statusId: 1,
                mobile: '543148159',
                sexId: 2,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            },
            {
                loginStatus: false,
                userId: 11,
                userName: 'Test1 Child4 Child2',
                emailId: 'Test2@gmail.com',
                location: 'Dubai',
                statusDescription: 'In Progress',
                statusId: 2,
                mobile: '543148160',
                sexId: 1,
                dob: new Date(),
                kpi: {},
                teamMembers: [],
                isDetailsLoaded: false
            }
        ];

        state.isDetailsLoaded = true;

        return state;
    }
    else {
        state.teamMembers = [];

        state.isDetailsLoaded = true;
        return state;
    }
}

const getFakeStatusDescription = (statusId) => {
    if (statusId === 1) {
        return 'Active';
    }
    else if (statusId === 2) {
        return 'In Progress';
    }
    else if (statusId === 3) {
        return 'Not Started';
    }
    else {
        return 'Not Interested';
    }

    statusDescription: 'Active'
}

const getFakeChangeStatus = (state) => {
    state.userDetails.statusId = state.changedStatusId;
    state.userDetails.statusDescription = getFakeStatusDescription(state.changedStatusId);
    return state.userDetails;
}

export const teamMemberSelected = state => ({
    type: constants.TEAMMEMBER_SELECTED,
    payload: getFakeData(state)
})

export const teamMemberStatusChanged = state => ({
    type: constants.TEAMMEMBER_STATUS_CHANGED,
    payload: getFakeChangeStatus(state)
})

