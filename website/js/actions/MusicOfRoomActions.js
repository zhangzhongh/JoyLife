/**
 * Created by jiangzz on 2017/2/4.
 */
import * as types from '../constants/ActionTypes';
import {SONGS_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';
import { message } from 'antd';

//推荐歌曲维护数据获取
export function fetchSongs(SceneId){
    return dispatch => {
        dispatch(fetchSONGSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'SceneOfRooms/'+SceneId+'/music',
            method:'GET'
        })
        .then((responseData) =>{
            dispatch(receiveSONGSesult(responseData));
        })
    }
}

function fetchSONGSesult() {
    return {
        type: types.FETCH_SONGS_RESULT
    }
}

function receiveSONGSesult(responseData) {
    return {
        type: types.RECEIVE_SONGS_RESULT,
        rawData: responseData
    }
}

/*
 * 添加更新歌曲操作
 * musicId:选中的歌曲，当前行元素的id
 * SceneId:当前情景id
 * params：主要将音乐库中原歌曲所属情景id 改成 新的情景id后，变成新增一条音乐数据
 * */
export function UpdateSONGS(Rowmusic){
    return dispatch => {
        return requestAPI({
            path:'MusicOfRooms/MusicOfRoomUpdatemusic',
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

/*
 * 删除歌曲
 * deletesongsData：删除指定的当前行元素
 * SceneId:删除歌曲所属情景id
 * */
export function DeleteSONGS(musicId,SceneId){
    return dispatch => {
        return requestAPI({
            path:'MusicOfRooms/'+musicId,
            method:'DELETE'
        })
        .then((responseData) => {
            if(responseData.count>0){
                message.success('删除声音成功');
                dispatch(fetchSongs(SceneId));
            }else if(responseData.error.statusCode==401){
                message.warning('对不起，您没有此权限，请示管理员或超级管理员操作此权限')
            }else{
                message.error('删除声音失败，请刷新页面重试~')
            }
        })
    }
}