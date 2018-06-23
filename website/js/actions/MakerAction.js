import * as types from '../constants/ActionTypes';
import { requestAPI } from '../utils/RequestUtils';
import { message } from 'antd';

//获取声音创客数据
export function fetchMakerData() {
    var filter = {order:'uploadAccount DESC'};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMakerResult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Registrators' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            dispatch(receiveMakerResult(responseData));
        })
    }
}

export function fetchMakerSearchResult(keyword) {
    var filter ={where:{or:[{nickname: {like: '%'+keyword+'%'}},{username:{like:'%'+keyword+'%'}},{realm:{like:'%'+keyword+'%'}}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMakerResult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Registrators' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMakerResult([]));
            }else {
                dispatch(receiveMakerResult(responseData));
            }
        })
    }
}

export function DeleteMaker(userId){
    console.log(userId);
    return dispatch => {
        return requestAPI({
            path:'Registrators/'+userId,
            method: 'DELETE'
        }).then((responseData) => {
            if(responseData.count>0){
                message.success('删除成功');
            }else if(responseData.error.statusCode==401){
                message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('删除失败，请刷新页面重试');
            }
            dispatch(fetchMakerData());
        });
    };
}

function fetchMakerResult() {
    return {
        type: types.FETCH_MAKER_DATA
    }
}

function receiveMakerResult(responseData) {
    return {
        type: types.RECEIVE_MAKER_DATA,
        rawData: responseData
    }
}