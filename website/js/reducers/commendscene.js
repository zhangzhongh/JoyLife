/**
 * Created by HULL on 2017/2/13.
 * 音乐分类
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    MusicSceneData:undefined,
    AddMusicSceneData:[],
    deleteRowSceneData:[],
    reviseSceneName:undefined
};

export default function musicscene(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_MUSICSCENE_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.RECEIVE_MUSICSCENE_DATA:
            return Object.assign({}, state, {
                fetched: true,
                MusicSceneData: action.rawData
            });
        case ActionTypes.ADD_ROW_SCENE:
            return Object.assign({}, state, {
                fetched: true,
                MusicSceneData: [...state.MusicSceneData, action.AddMusicSceneData]
            });
        case ActionTypes.DELETE_ROW_SCENE:
            var newArray=[];
            for(var i=0;i<state.MusicSceneData.length;i++){
                var item=state.MusicSceneData[i];
                if(item.id!=action.deleteRowSceneData){
                    newArray.push(item);
                }
            }
            return Object.assign({}, state, {
                MusicSceneData:newArray
            });
        default:
            return state;
    }
}
