import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    ClientLoginAccountData:[]
};

export default function clientloginstatistical(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });
    switch (action.type) {
        case ActionTypes.FETCH_CLIENTLOGINACCOUNT_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_CLIENTLOGINACCOUNT_DATA:
            return Object.assign({}, state, {
                fetched: true,
                ClientLoginAccountData: action.rawData
            });
        default:
            return state;
    }
}