import * as constants from '../constants';
const getFakeData = () => {
    return {
        status: [
            {
                statusId:1,
                statusDescription:'Active'
            },
            {
                statusId:2,
                statusDescription:'In Progress'
            }
            ,
            {
                statusId:3,
                statusDescription:'Not Started'
            }
            ,
            {
                statusId:4,
                statusDescription:'Not Interested'
            }
        ],
        sex:[
            {
                sexId:1,
                sexDescription:'Male'
            },
            {
                sexId:2,
                sexDescription:'FeMale'
            },
            {
                sexId:3,
                sexDescription:'Others'
            }
        ]
    }
}

export const loadLookup = state => ({
    type: constants.LOAD_LOOKUP,
    payload: getFakeData()
})

