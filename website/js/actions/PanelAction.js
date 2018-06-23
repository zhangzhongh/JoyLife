import * as types from '../constants/ActionTypes';
import {PANELMAINTAIN_URL} from '../constants/Network';
import { request,requestAPI } from '../utils/RequestUtils';
import { message } from 'antd';

//获取标题栏数据
export function fetchPanelMaintain(token) {
    return dispatch => {
        dispatch(fetchPanelMaintainResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        //return request(PANELMAINTAIN_URL, 'post', body, {'Accept': 'application/json', 'Content-Type': 'application/json',})
        //    .then((responseData) => {
        //        dispatch(receivePanelMaintainResult(responseData));
        //    })
        //    .catch((error) => {
        //        console.error('fetchPanelMaintain error: ' + error);
        //        dispatch(receivePanelMaintainResult([]));
        //    })
        return requestAPI({
            path: 'Panels',
            method: 'GET'
        }).then((responseData) => {
            console.log(responseData);
            dispatch(receivePanelMaintainResult(responseData));
        })
    }
}

function fetchPanelMaintainResult() {
    return {
        type: types.FETCH_PANELMAINTAIN_DATA
    }
}

function receivePanelMaintainResult(responseData) {
    return {
        type: types.RECEIVE_PANELMAINTAIN_DATA,
        rawData: responseData
    }
}

export function UpdatePanel(id,params){
    var id={"id":id};
    return dispatch => {
        return requestAPI({
            path:'Panels/update'+"?where=" + encodeURIComponent(JSON.stringify(id), "UTF-8"),
            method:'POST',
            params:params
        }).then((responseData) => {
            if(responseData.count>0){
                message.success('更新成功');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员或上传者操作此功能');
            }else{
                message.error('更新失败，请刷新页面重试~');
            }
            dispatch(fetchPanelMaintain());
        })
    }
}