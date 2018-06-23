/**
 * Created by HULL on 2017/2/10.
 * 音乐库
 */
'use strict';

import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {
    fetching: false,
    fetched: false,
    fetchingStoreMusic: false,
    fetchedStoreMusic: false,
    ModalVisible:false,
    MusicStoreData:undefined,
    StoreMusicList:undefined,
    selectedRowKeys:[]
};

export default function musicstore(state = defaultState, action) {
    state = Object.assign({}, state, {
        fetching: false,
        fetchingStoreMusic: false
    });

    switch (action.type) {
        case ActionTypes.FETCH_SCENEMUSIC_DATA:
            return Object.assign({}, state, {
                fetching: true,
                fetched: false
            });
        case ActionTypes.FETCHED_SCENEMUSIC_DATA:
            return Object.assign({}, state, {
                fetching: false,
                fetched: true
            });
        case ActionTypes.RECEIVE_SCENEMUSIC_DATA:
            var data = action.rawData;
            for (let i = 0; i < data.length; i++) {
                data[i].key=i;
            }
            return Object.assign({}, state, {
                fetched: true,
                MusicStoreData: data
            });
        case ActionTypes.FETCH_STOREMUSIC_DATA:
            return Object.assign({}, state, {
                fetchingStoreMusic: true,
                fetchedStoreMusic: false
            });
        case ActionTypes.RECEIVE_STOREMUSIC_DATA:
            var data = action.rawData;
            for (let i = 0; i < data.length; i++) {
                data[i].key=i;
            }
            return Object.assign({}, state, {
                fetchedStoreMusic: true,
                StoreMusicList: data
            });
        case ActionTypes.SELECT_ROW_KEYS:
            return Object.assign({}, state, {
                selectedRowKeys: action.selectedRowKeys
            });
        case ActionTypes.MODAL_VISIBLE:
            return Object.assign({}, state, {
                ModalVisible: action.ModalVisible
            });
        default:
            return state;
    }
}
