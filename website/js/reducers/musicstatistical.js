import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    MusicStatisticalData:[]
};

export default function musicstatistical(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });
    switch (action.type) {
        case ActionTypes.FETCH_MUSICSTATISTICAL_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_MUSICSTATISTICAL_DATA:
            return Object.assign({}, state, {
                fetched: true,
                MusicStatisticalData: action.rawData
            });
        default:
            return state;
    }
}