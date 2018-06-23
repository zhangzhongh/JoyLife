/**
 * Created by jiangzz on 2017/2/4.
 * 情景维护
 */
'use strict';
import * as ActionTypes from '../constants/ActionTypes';

const defaultState={
    fetching:false,
    fetched:false,
    SceneMaintenanceData:undefined
}

export default function scene(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_SCENE_RESULT:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_SCENE_RESULT:
            return Object.assign({}, state, {
                fetched: true,
                SceneMaintenanceData: action.rawData
            });
        case ActionTypes.ADD_SCENE:
            return Object.assign({},state, {
                SceneMaintenanceData: [...state.SceneMaintenanceData, action.addsceneData]
            });
        case ActionTypes.DELETE_SCENE:
            var newArray=[];
            for(var i=0;i<state.SceneMaintenanceData.length;i++){
                var item=state.SceneMaintenanceData[i];
                if(item.id!=action.deletesceneData.id){
                    newArray.push(item);
                }
            }
            return Object.assign({}, state, {
                SceneMaintenanceData:newArray
            });

        default:
            return state;
    }
}
