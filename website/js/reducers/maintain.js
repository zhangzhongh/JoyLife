/**
 * Created by syl on 2017/2/4.
 * 维护人员
 */
'use strict';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState={
    fetching:false,
    fetched:false,
    MaintainPersonData:undefined,
    account:undefined
}

export default function maintain(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_MAINTAIN_RESULT:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_MAINTAIN_RESULT:
            return Object.assign({}, state, {
                fetched: true,
                MaintainPersonData: action.rawData
            });
        case ActionTypes.RECEIVE_PERSON_INFO:
            return Object.assign({}, state, {
                fetched: true,
                account: action.accountInfo
            });
        case ActionTypes.RECEIVE_EDIT_INFORMATION:
            return Object.assign({}, state, {
                fetched: true,
                account: action.account
            });
        case ActionTypes.RECEIVE_MODIFY_PASSWORD:
            return Object.assign({}, state, {
                fetched: true,
                account: action.account
            });
        default:
            return state;
    }
}
