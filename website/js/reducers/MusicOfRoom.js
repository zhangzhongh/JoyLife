/**
 * Created by jiangzz on 2017/2/4.
 * 推荐歌曲维护
 */
'use strict';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState={
    fetching:false,
    fetched:false,
    SongsMaintenanceData:undefined
}

export default function songs(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_SONGS_RESULT:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_SONGS_RESULT:
            return Object.assign({}, state, {
                fetched: true,
                SongsMaintenanceData: action.rawData
            });
        case ActionTypes.ADD_SONGS:
            return Object.assign({},state, {
                SongsMaintenanceData: [...state.SongsMaintenanceData, action.addsongsData]
            });
        case ActionTypes.DELETE_SONGS:
            var newArray=[];
            for(var i=0;i<state.SongsMaintenanceData.length;i++){
                var item=state.SongsMaintenanceData[i];
                if(item.id!=action.deletesongsData.id){
                    newArray.push(item);
                }
            }
            return Object.assign({}, state, {
                SongsMaintenanceData:newArray
            });

        default:
            return state;
    }
}
