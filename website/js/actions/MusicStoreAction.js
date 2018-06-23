/**
 * Created by HULL on 2017/2/10.
 * 音乐库
 */
import * as types from '../constants/ActionTypes';
import {MUSICSTORE_URL} from '../constants/Network';
import { requestAPI,uploadFileAPI } from '../utils/RequestUtils';
import { message } from 'antd';

/*
 * 获取最热音乐
 *
 * */
export function getHotMusic(){
    var _filter = {'where':{'auditStatus':'已通过'},order:'hitCount DESC'};
    return getMusic(_filter);
}

/*
 * 获取最新音乐
 *
 * */
export function getNewMusic(){
    var _filter = {'where':{'auditStatus':'已通过'},order:['topOrNot DESC','createTime DESC']};
    return getMusic(_filter);
}

/*
 * 获取音乐库情景下的音乐
 *
 * */
export function getMusicOfSceneData(SceneId){
    var _filter = {};
    var pathStr = 'Scenes/'+SceneId+'/musics';
    return getMusic(_filter, pathStr);
}

/*
 * 获取声音创客下的音乐
 *
 * */
export function getMakeMusicData(userId){
    var _filter = {'where':{and:[{'userId':userId},{auditStatus: {neq: '已添加'}}]}};
    return getMusic(_filter);
}

/*
 * 获取声音超市下的音乐
 *
 * */
export function getSupermarketMusicData(sceneName){
    var _filter = {'where':{'sceneName':sceneName}};
    return getMusic(_filter);
}

function getMusic(filter, pathStr){
    pathStr = pathStr || 'music';
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: pathStr + '?filter=' + _filter,
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveMusicSesult(responseData));
        })
    };
}

export function fetchHotMusicSearchResult(keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{auditStatus: '已通过'}]},order:'hitCount DESC'};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMusicSesult([]));
            }else {
                dispatch(receiveMusicSesult(responseData));
            }
        })
    }
}

export function fetchNewMusicSearchResult(keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{auditStatus: '已通过'}]},order:['topOrNot DESC','createTime DESC']};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMusicSesult([]));
            }else {
                dispatch(receiveMusicSesult(responseData));
            }
        })
    }
}

export function fetchSupermarketMusicSearchResult(sceneName,keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{sceneName:sceneName}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMusicSesult([]));
            }else {
                dispatch(receiveMusicSesult(responseData));
            }
        })
    }
}

export function fetchMakerMusicSearchResult(userId,keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{userId:userId},{auditStatus: {neq: '已添加'}}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMusicSesult([]));
            }else {
                dispatch(receiveMusicSesult(responseData));
            }
        })
    }
}

export function fetchSceneMusicSearchResult(sceneId,keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{sceneId:sceneId}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music' + '?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveMusicSesult([]));
            }else {
                dispatch(receiveMusicSesult(responseData));
            }
        })
    }
}

function fetchMusicSesult() {
    return {
        type: types.FETCH_SCENEMUSIC_DATA
    }
}

function receiveMusicSesult(responseData) {
    return {
        type: types.RECEIVE_SCENEMUSIC_DATA,
        rawData: responseData
    }
}

function fetchStoreMusicResult() {
    return {
        type: types.FETCH_STOREMUSIC_DATA
    }
}

function receiveStoreMusicResult(responseData) {
    return {
        type: types.RECEIVE_STOREMUSIC_DATA,
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
 * 添加音乐
 * 声音超市内的
 * */
export function AddSupermarketMusicData(SceneName,AddMusicData){
    return dispatch => {
        return requestAPI({
            path:'Music',
            method: 'POST',
            params:AddMusicData
        })  .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有添加权限，请示管理员或超级管理员或上传者操作此功能');
            }else{
                message.success('添加声音成功');
            }
        })
    };
}

/*
 * 添加音乐
 * 乐库的 推荐情景内的
 * */
export function AddMusicOfSceneData(SceneId,AddMusicData){
    return dispatch => {
        return requestAPI({
            path:'Music',
            method: 'POST',
            params:AddMusicData
        })  .then((responseData) => {
            if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有添加权限，请示管理员或超级管理员或上传者操作此功能');
            }else{
                message.success('添加声音成功');
            }
        })
    };
}

/*
 * 删除声音超市下的声音
 *
 * */
export function DeleteSupermarketMusic(sceneName,deleteMusicId){
    return dispatch => {
        return requestAPI({
            path:'Music/'+deleteMusicId,
            method: 'DELETE'
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('删除声音成功');
                dispatch(getSupermarketMusicData(sceneName));
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('删除声音失败，请刷新页面重试~');
            }
        })
    };
}


/*
 * 删除声音创客下的声音
 *
 * */
export function DeleteMakeMusic(userId,deleteMusicId){
    return dispatch => {
        return requestAPI({
            path:'Music/'+deleteMusicId,
            method: 'DELETE'
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('删除声音成功');
                dispatch(getMakeMusicData(userId));
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('删除声音失败，请刷新页面重试~');
            }
        })
    };
}

/*
 * 删除推荐情景下的声音
 *
 * */
export function DeleteMusic(sceneId,deleteMusicId){
    return dispatch => {
        return requestAPI({
            path:'Music/'+deleteMusicId,
            method: 'DELETE'
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('删除声音成功');
                dispatch(getMusicOfSceneData(sceneId));
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('删除声音失败，请刷新页面重试~');
            }
        })
    };
}

/*修改声音信息*/
export function UpdateMusic(rawId,params){
    var filter={id:rawId};
    return dispatch => {
        return requestAPI({
            path:'Music/update'+"?where=" + encodeURIComponent(JSON.stringify(filter), "UTF-8"),
            method:'POST',
            params:params
        }).then((responseData) => {
            if(responseData.count>0){
                message.success('声音信息修改完成');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有编辑权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('声音信息修改失败，请刷新页面重试~');
            }
        })
    }
}

/*
 * 获取音乐库已审核声音数据
 *{where: {and: [{title: 'My Post'}, {content: 'Hello'}]}}
 * */
export function getAuditMusicData(MusicData){
    var str = {'where':{'auditStatus':MusicData}};
    var urlstr = encodeURIComponent(JSON.stringify(str), 'UTF-8');
    return dispatch => {
        dispatch(fetchStoreMusicResult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Music?filter='+urlstr,
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveStoreMusicResult(responseData));
        })
    };
}

export function fetchAuditMusicSearchResult(MusicData,keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{auditStatus: MusicData}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchStoreMusicResult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'Music?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveStoreMusicResult([]));
            }else {
                dispatch(receiveStoreMusicResult(responseData));
            }
        })
    }
}

export function fetchCheckMusicSearchResult(MusicData,userId,keyword) {
    var filter ={where:{and: [{or:[{name: {like: '%'+keyword+'%'}},{singer:{like:'%'+keyword+'%'}},{describe:{like:'%'+keyword+'%'}}]},{auditorId:userId},{auditStatus: MusicData}]}};
    var _filter = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchStoreMusicResult());//正在获取数据，进度条提示
        return requestAPI({
            path: 'MusicCheckLogs?filter=' + _filter,
            method: 'GET'
        }).then((responseData) => {
            if (responseData == '缺少参数' || responseData == '查询失败'){
                dispatch(receiveStoreMusicResult([]));
            }else {
                dispatch(receiveStoreMusicResult(responseData));
            }
        })
    }
}

//获取待审核记录
export function getCheckMusicData(MusicData,userId){
    var str = {where:{and:[{auditStatus:MusicData},{auditorId:userId}]}};
    var urlstr = encodeURIComponent(JSON.stringify(str), 'UTF-8');
    return dispatch => {
        dispatch(fetchStoreMusicResult());//正在获取数据，进度条提示
        return requestAPI({
            path:'MusicCheckLogs?filter='+urlstr,
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveStoreMusicResult(responseData));
        })
    };
}

/*
 * 向审核记录表内上报数据
 *
 * */
export function reportAuditMusicData(MusicId,AuditMusicData){
    var rawMusicId={"id":MusicId};
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'MusicCheckLogs/update'+"?where=" + encodeURIComponent(JSON.stringify(rawMusicId), "UTF-8"),
            method: 'POST',
            params:AuditMusicData
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('审核成功');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有此审核权限，只有一级审核人员有此权限');
            }else{
                message.error('审核失败，请刷新页面重试~')
            }
            dispatch(getCheckMusicData('待审核',localStorage.getItem("userId")));
        })
    };
}

/*
 * Modal状态
 *
 * */
export function setModalVisible(ModalVisible) {
    return {
        type: types.MODAL_VISIBLE,
        ModalVisible: ModalVisible
    };
}

/*
 * 把该条音乐置项--最新
 *
 * */
export function setMusicStickNew(MusicId,topOrNot){
    return dispatch => {
        dispatch(fetchMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Music/'+MusicId+'/setStickNew',
            method: 'PATCH',
            params:{'topOrNot':topOrNot}
        }).then((responseData) => {
            if(responseData.topOrNot){
                if(topOrNot){
                    message.success('置项成功');
                }else{
                    message.success('取消置项成功');
                }
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有置顶权限，请示管理员或超级管理员操作此功能');
            }else{
                message.success('请刷新页面重试~');
            }
            dispatch(getNewMusic());
        })
    };
}

/*
 * 上传
 *
 * */
export function uploadFile(SceneId,Song,Singer,file) {
    return dispatch => {
            uploadFileAPI({
                path:'Scenes/'+SceneId+'/uploadMusic/'+ Singer +'/' + Song,
                file:file
            }).then((responseData) => {
                if(responseData.error&&responseData.error.statusCode==401){
                    message.warning('对不起，您没有此权限，请示管理员或超级管理员或上传者操作此功能');
                }else{
                    message.success('上传成功');
                }
            });
    }

}

export function createMusic(Rowmusic){
    return dispatch => {
        return requestAPI({
            path:'Music/CreateMusic',
            method:'POST',
            params:Rowmusic
        })
            .then((responseData) =>{
                if (responseData.ret==0){
                    message.success('添加声音成功');
                }else if(responseData.error.statusCode==401){
                    message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此功能');
                }else{
                    message.error('添加声音失败，请刷新页面重试~')
                }
            })
    }
}