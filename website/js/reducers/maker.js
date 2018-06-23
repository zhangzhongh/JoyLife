import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    MakerData:[]
};

export default function maker(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });
    switch (action.type) {
        case ActionTypes.FETCH_MAKER_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_MAKER_DATA:
            return Object.assign({}, state, {
                fetched: true,
                MakerData: action.rawData
            });
        default:
            return state;
    }
}
