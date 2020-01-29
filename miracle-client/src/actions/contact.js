import * as constants from '../constants';

let userIdCounter = 50;

export const contactAdded = state => ({
    type: constants.CONTACT_ADDED,
    payload: Object.assign({}, state, { userId: userIdCounter++ })
})

export const contactUpdated = state => ({
    type: constants.CONTACT_UPDATED,
    payload: Object.assign({}, state, { userId: userIdCounter++ })
})

