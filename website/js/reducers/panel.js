import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    PanelMaintainData:[]
};

export default function panelmaintain(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });
    switch (action.type) {
        case ActionTypes.FETCH_PANELMAINTAIN_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_PANELMAINTAIN_DATA:
            return Object.assign({}, state, {
                fetched: true,
                PanelMaintainData: action.rawData
            });
        default:
            return state;
    }
}