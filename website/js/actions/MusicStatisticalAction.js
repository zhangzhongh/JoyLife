import * as types from '../constants/ActionTypes';
import {MUSICSTATISTICAL_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';

//获取歌曲统计数据
export function fetchMusicStatisticalData(token) {
    return dispatch => {
        dispatch(fetchMusicStatisticalResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        var fliter={where:{auditStatus: {neq: '已添加'}},order:"createTime DESC"};
        return requestAPI({
            path:'Music?filter=' + encodeURIComponent(JSON.stringify(fliter), 'UTF-8'),
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveMusicStatisticalResult(responseData));
        })
    }
}

function fetchMusicStatisticalResult() {
    return {
        type: types.FETCH_MUSICSTATISTICAL_DATA
    }
}

function receiveMusicStatisticalResult(responseData) {
    return {
        type: types.RECEIVE_MUSICSTATISTICAL_DATA,
        rawData: responseData
    }
}