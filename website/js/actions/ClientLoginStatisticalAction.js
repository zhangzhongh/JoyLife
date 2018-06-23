import * as types from '../constants/ActionTypes';
import {CLIENTLOGINACCOUNT_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';

//获取客户端登录次数数据
export function fetchClientLoginAccount(token) {
    return dispatch => {
        dispatch(fetchClientLoginAccountResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        var fliter={order:"createTime DESC"};
        return requestAPI({
            path: 'Registrators?filter=' + encodeURIComponent(JSON.stringify(fliter), 'UTF-8'),
            method: 'GET'
        }).then((responseData) => {
            dispatch(receiveClientLoginAccountResult(responseData));
        })
    }
}

function fetchClientLoginAccountResult() {
    return {
        type: types.FETCH_CLIENTLOGINACCOUNT_DATA
    }
}

function receiveClientLoginAccountResult(responseData) {
    return {
        type: types.RECEIVE_CLIENTLOGINACCOUNT_DATA,
        rawData: responseData
    }
}