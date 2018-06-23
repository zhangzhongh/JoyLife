/**
 * Created by jiangzz on 2017/2/4.
 */
import * as types from '../constants/ActionTypes';
import {ROOM_URL} from '../constants/Network';
import { requestAPI, uploadFileAPI } from '../utils/RequestUtils';
import { message } from 'antd';

//调用loopback接口方法举例
//房间维护数据获取
export function fetchRoom(token) {
    return dispatch => {
        dispatch(fetchROOMResult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Rooms',
            method: 'GET',
        })
        .then((responseData) => {
            dispatch(receiveROOMResult(responseData));
        })
    }
}

function fetchROOMResult() {
    return {
        type: types.FETCH_ROOM_RESULT
    }
}

function receiveROOMResult(responseData) {
    return {
        type: types.RECEIVE_ROOM_RESULT,
        rawData: responseData
    }
}

/*
* 增加房间
* addroomData : 添加房间
* newaddroomData: 添加新的房间
* */
export function AddROOM(newaddroomData) {
    return dispatch => {
        return requestAPI({
            path: 'Rooms',
            method: 'POST',
            params:newaddroomData
        })
        .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能');
                return;
            }else{
                message.success('添加房间成功');
                dispatch(fetchRoom());
            }
        })
    }
}

/*
* 删除房间
* deleteroomData：删除指定的当前行元素
* rawId ： 当前房间的id
* */
export function DeleteROOM(rawId) {
    return dispatch => {
        return requestAPI({
            path: 'Rooms/'+rawId,
            method: 'DELETE'
        })
        .then((responseData) => {
            if(responseData.count>0){
                message.success('删除房间成功');
                dispatch(fetchRoom(rawId));
            }else if(responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能')
            }else{
                message.error('没删除成功,请刷新页面重试~')
            }
        })
    }
}

/*
 * 可重新编辑房间名称
 * rawId:修改当前元素行的id
 * params ：修改完成后的内容
 * */
export function UpdateROOM(rawId,params){
    var rawROOMId={"id":rawId};
    return dispatch => {
        return requestAPI({
            path:'Rooms/update'+"?where=" + encodeURIComponent(JSON.stringify(rawROOMId), "UTF-8"),
            method:'POST',
            params:params
        })
        .then((responseData) => {
            if(responseData.count>0){
                message.success('房间名称或描述已修改完成');
            }else if(responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('修改更新失败,请刷新页面重试~')
            }
            dispatch(fetchRoom(rawId));
        })
    }
}

/*
 * 房间维护上传图片操作
 * roomImgfile:创建上传房间图片的文件夹名字
 * roomImgName：上传图片的名字
 * */
export function uploadRoomImgFile(roomImgfile, roomImgName,file) {
    return dispatch => {
        uploadFileAPI({
            path:'Rooms/'+roomImgfile+'/uploadRoomImg/'+roomImgName,
            file:file
        })
        .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有上传图片权限，请示管理员或超级管理员操作此功能');
                return;
            }else{
                message.success('上传图片成功');
            }
        });
    }

}
