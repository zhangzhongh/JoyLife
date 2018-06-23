/**
 * Created by HULL on 2017/2/21.
 * 审核
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    AuditMusicStoreData:undefined,
    passedAccount:0,
    notPassAccount:0,
    auditing:0
};

export default function musiccheck(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_AUDITMUSIC_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_AUDITMUSIC_DATA:
            var data = action.checkData;
            var passedAccount=0;
            var notPassAccount=0;
            var auditing=0;
            for(var i=0;i<data.length;i++){
                if (data[i].auditStatus=='已通过'){
                    passedAccount++;
                }else if(data[i].auditStatus=='未通过'){
                    notPassAccount++;
                }else if(data[i].auditStatus=='待审核'){
                    auditing++;
                }
            }
            return Object.assign({}, state, {
                fetched: true,
                AuditMusicStoreData: action.checkData,
                passedAccount:passedAccount,
                notPassAccount:notPassAccount,
                auditing:auditing
            });
        default:
            return state;
    }
}
