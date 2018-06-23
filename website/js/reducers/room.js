/**
 * Created by jiangzz on 2017/2/4.
 * 房间维护
 */
'use strict';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState={
    fetching:false,
    fetched:false,
    RoomMaintenanceData:undefined
}

export default function room(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_ROOM_RESULT:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_ROOM_RESULT:
            return Object.assign({}, state, {
                fetched: true,
                RoomMaintenanceData: action.rawData
            });
        case ActionTypes.ADD_ROOM:
            return Object.assign({},state, {
                RoomMaintenanceData: [...state.RoomMaintenanceData, action.addroomData]
            });
        case ActionTypes.DELETE_ROOM:
            var newArray=[];
            for(var i=0;i<state.RoomMaintenanceData.length;i++){
                var item=state.RoomMaintenanceData[i];
                if(item.id!=action.deleteroomData){
                    newArray.push(item);
                }
            }
            return Object.assign({}, state, {
                RoomMaintenanceData:newArray
            });

        default:
            return state;
    }
}
