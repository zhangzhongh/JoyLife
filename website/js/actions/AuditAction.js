/**
 * Created by HULL on 2017/2/21.
 * 审核
 */
import * as types from '../constants/ActionTypes';
import {MUSICSTORE_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';

export function getMusicData(MusicData){
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Music',
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveMusicSesult(responseData));
        })
    };
}


function fetchMusicSesult() {
    return {
        type: types.FETCH_SCENEMUSIC_DATA
    }
}

function receiveMusicSesult(responseData) {
    console.log(responseData);
    return {
        type: types.RECEIVE_SCENEMUSIC_DATA,
        rawData: responseData
    }
}
