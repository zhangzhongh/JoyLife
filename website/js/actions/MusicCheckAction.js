/**
 * Created by HULL on 2017/2/21.
 * 审核
 */
import * as types from '../constants/ActionTypes';
import {AUDITMUSICSTORE_URL} from '../constants/Network';
import { requestAPI } from '../utils/RequestUtils';
import {getAuditMusicData} from '../actions/MusicStoreAction';
import { message } from 'antd';
/*
 * 获取审核记录表中的音乐
 *
 * */
export function getCheckMusicData(CheckMusicData){
    return dispatch => {
        dispatch(fetchCheckMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'MusicCheckLogs',
            method: 'GET'
        })  .then((responseData) => {
            dispatch(receiveCheckMusicSesult(responseData));
        })
    };
}

function fetchCheckMusicSesult() {
    return {
        type: types.FETCH_AUDITMUSIC_DATA
    }
}

function receiveCheckMusicSesult(responseData) {
    return {
        type: types.RECEIVE_AUDITMUSIC_DATA,
        checkData: responseData
    }
}
/*
 * 获取审核记录表内上报的数据
 *
 * */
export function getAuditLoggingData(name,singer,sceneName){
    var str = {where:{and:[{name:name},{singer:singer},{sceneName:sceneName}]}};
    var urlstr = encodeURIComponent(JSON.stringify(str), 'UTF-8');
    return dispatch => {
        dispatch(fetchCheckMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'MusicCheckLogs?filter='+urlstr,
            method: 'GET'
        })  .then((responseData) => {

            dispatch(receiveCheckMusicSesult(responseData));
        })
    };
}

/*
 * 向音乐表内上报数据
 * 审核声音内  二级审核人员角色（审核声音：上报通过或未通过）
 * */
export function reportMusicData(MusicId,MusicData,userId){
    var rawMusicId={"id":MusicId};
    return dispatch => {
        dispatch(fetchCheckMusicSesult());//正在获取数据，进度条提示
        return requestAPI({
            path:'Music/update'+"?where=" + encodeURIComponent(JSON.stringify(rawMusicId), "UTF-8"),
            method: 'POST',
            params:MusicData
        })  .then((responseData) => {
            if(responseData.count>0){
                message.success('审核成功');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有此审核权限，只有二级审核人员有此权限');
            }else{
                message.error('审核失败，请刷新页面重试~')
            }
            dispatch(getAuditMusicData('待审核'));
            if(MusicData.auditStatus == '已通过'){
                updateUploadAccount(userId);
            }
        })
    };
}
/*
* 声音审核通过后，刷新‘统计—客户端注册统计界面’个人上传声音数数据
* */
function updateUploadAccount(userId) {
    return requestAPI({
        path:'Registrators/' + userId,
        method: 'GET'
    }).then((responseData) => {
        if(!responseData.error){
            var filter={id:responseData.id};
            var MusicData={uploadAccount:parseInt(responseData.uploadAccount + 1)};
            return requestAPI({
                path:'Registrators/update?where=' + encodeURIComponent(JSON.stringify(filter), "UTF-8"),
                method: 'POST',
                params:MusicData
            }).then((responseData) => {
                console.log('更新成功')
            })
        }
    });
}