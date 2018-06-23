/**
 * Created by jiangzz on 2017/2/4.
 */
import * as types from '../constants/ActionTypes';
import {SCENE_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';
import { message } from 'antd';

/*
* 情景维护数据获取
* */
export function fetchScene(roomId){
    return dispatch => {
        dispatch(fetchSCENEResult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Rooms/'+roomId+'/Scene',
            method:'GET'
        })
        .then((responseData) => {
            dispatch(receiveSCENEResult(responseData));
        })
    }
}

function fetchSCENEResult() {
    return {
        type: types.FETCH_SCENE_RESULT
    }
}

function receiveSCENEResult(responseData) {
    return {
        type: types.RECEIVE_SCENE_RESULT,
        rawData: responseData
    }
}

/*
 * 增加情景
 * addsceneData : 添加情景
 * RoomId ：添加的情景所属房间id
 * */
export function AddSCENE(newaddsceneData,RoomId){
    return dispatch => {
        return requestAPI({
            path:'Rooms/'+RoomId+'/Scene',
            method:'POST',
            params:newaddsceneData
        })
        .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning("对不起，您没有此权限，请示管理员或超级管理员操作此功能");
                return;
            }else{
                message.success('添加情景成功');
                dispatch(fetchScene(RoomId))
            }
        })
    }
}

/*
 * 删除情景
 * deletesceneData：删除指定的当前行元素
 * sceneId:当前情景id
 * RoomId ：删除的情景所属房间id，用于在删除成功后及时刷新该房间情景页面
 * */
export function DeleteSCENE(sceneId,RoomId){
    return dispatch =>{
        return requestAPI({
            path:'SceneOfRooms/'+sceneId,
            method:'DELETE'
        })
        .then((responseData) =>{
            if(responseData.count>0){
                message.success('删除情景成功');
                dispatch(fetchScene(RoomId))
            }else if(responseData.error.statusCode==401){
                message.warning("对不起，您没有此权限，请示管理员或超级管理员操作此功能")
            }else{
                message.error('没删除成功,请刷新页面重试~')
            }
        })
    }
}

/*
 * 编辑情景名称
 * sceneId:修改当前元素行的id
 * params ：修改完成后的内容
 * RoomId：情景所属房间id
 * */
export function UpdateSCENE(sceneId,RoomId,params){
    var rawSCENEId={"id":sceneId};
    return dispatch =>{
        return requestAPI({
            path:'SceneOfRooms/update'+'?where='+encodeURIComponent(JSON.stringify(rawSCENEId), "UTF-8"),
            method:'POST',
            params:params
        })
        .then((responseData) => {
            if(responseData.count>0){
                message.success('情景名称已修改完成');
            }else if(responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('修改更新失败,请刷新页面重试~')
            }
            dispatch(fetchScene(RoomId));
        })
    }
}
