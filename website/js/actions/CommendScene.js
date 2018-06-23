/**
 * Created by HULL on 2017/2/13.
 * 音乐分类
 */
import * as types from '../constants/ActionTypes';
import {MUSICSCENE_URL} from '../constants/Network';
import { request,requestAPI,uploadFileAPI} from '../utils/RequestUtils';
import { message } from 'antd';

/*
 * 获取音乐库推荐情景数据
 *
 * */
export function getMusicSceneData(MusicSceneData){
    return dispatch => {
      dispatch(fetchMusicSceneSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Scenes',
            method: 'GET',
            params:MusicSceneData
        })  .then((responseData) => {
            dispatch(receiveMusicSceneSesult(responseData));
        })
    };
}

function fetchMusicSceneSesult() {
    return {
        type: types.FETCH_MUSICSCENE_DATA
    }
}

function receiveMusicSceneSesult(responseData) {
    return {
        type: types.RECEIVE_MUSICSCENE_DATA,
        rawData: responseData
    }
}

/*
 * 多选按钮
 *
 * */
export function SelectRowKeys(selectedRowKeys){
    return{
        type:types.SELECT_ROW_KEYS,
        selectedRowKeys:selectedRowKeys
    }
}

/*
 * 添加音乐类型
 *
 * */
export function AddMusicSceneData(AddMusicSceneData){
    return dispatch => {
        return requestAPI({
            path:'Scenes',
            method: 'POST',
            params:AddMusicSceneData
        })  .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能');
            }else{
                message.success('增加情景成功');
                dispatch(getMusicSceneData());
            }
        })
    };
}

/*
 * 删除情景
 *
 * */
export function DeleteRowScene(deleteRowSceneId){
    return dispatch => {
        return requestAPI({
            path:'Scenes/'+deleteRowSceneId,
            method: 'DELETE'
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('删除情景成功');
                dispatch(getMusicSceneData());
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('删除失败,请刷新页面重试~')
            }
        })
    };
}

/*
 * 可重新编辑推荐情景名称
 * rawId:修改当前元素行的id
 * params ：修改完成后的内容
 * */
export function UpdateMusicScene(rawId,params){
    var rawMusicSceneId={"id":rawId};
    return dispatch => {
        return requestAPI({
            path:'Scenes/update'+"?where=" + encodeURIComponent(JSON.stringify(rawMusicSceneId), "UTF-8"),
            method:'POST',
            params:params
        }).then((responseData) => {
            if(responseData.count>0){
                message.success('推荐情景名称已修改完成');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有编辑权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('推荐情景名称修改失败，请刷新页面重试~');
            }
            dispatch(getMusicSceneData(rawId));
        })
    }
}

/*
 * 音乐库情景分类上传图片操作
 * sceneImgFile:创建上传音乐库情景分类图片的文件夹名字
 * sceneImgName：上传图片的名字
 * */
export function uploadFile(sceneName,sceneImgFile, sceneImgName,file) {
    return dispatch => {
        uploadFileAPI({
            path:'Scenes/'+sceneImgFile+'/uploadMusic/'+sceneName+'/'+sceneImgName,
            file:file
        }).then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有上传图片权限，请示管理员或超级管理员或上传者操作此功能');
            }else{
                message.success('上传推荐情景图片成功');
            }
        });
    }

}