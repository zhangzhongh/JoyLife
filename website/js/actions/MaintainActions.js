/**
 * Created by syl on 2017/2/6.
 * 维护人员
 */
import * as types from '../constants/ActionTypes';
import {MAINTAIN_URL} from '../constants/Network';
import { request,requestAPI } from '../utils/RequestUtils';
import { message } from 'antd';

/**
 * 调用loopback接口方法,获取维护人员数据
 * @param token 加载进度条
 * @returns {Function}
 */
export function fetchMaintain(token) {
    var filter={"where":{"role":{"neq":""}}};
    var urlstr = encodeURIComponent(JSON.stringify(filter), 'UTF-8');
    return dispatch => {
        dispatch(fetchMaintainResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        return requestAPI({
            path: 'Accounts?filter=' + urlstr,
            method: 'GET'
        }).then((responseData) => {
            console.log(responseData);
            dispatch(receiveMaintainResult(responseData));
        })
    }
}

function fetchMaintainResult() {
    return {
        type: types.FETCH_MAINTAIN_RESULT
    }
}

function receiveMaintainResult(responseData) {
    return {
        type: types.RECEIVE_MAINTAIN_RESULT,
        rawData: responseData
    }
}

function receivePsersonInfo(responseData) {
    return {
        type: types.RECEIVE_PERSON_INFO,
        accountInfo: responseData
    }
}

/**
 * 删除人员
 * @param token
 * @param deleteManagerId 删除指定人员
 * @returns {Function}
 * @constructor
 */
export function DeleteMaintainPerson(token,deleteManagerId){
        return dispatch => {
            dispatch(fetchMaintainResult());//正在获取数据，进度条提示
            let body = JSON.stringify({
                token: token
            });
            return requestAPI({
                path:'Accounts/'+deleteManagerId,
                method: 'DELETE'
            }).then((responseData) => {
                if(responseData.count>0){
                    message.success('删除成功');
                }else if(responseData.error.statusCode==401){
                    message.warning('对不起，您没有删除权限，请示管理员或超级管理员操作此功能');
                }else{
                    message.error('删除失败，请刷新页面重试');
                }
                dispatch(fetchMaintain());
            });
        };
}

/**
 * 调用loopback接口方法,添加维护人员数据
 * @param token 加载进度条
 * @param managerJson 添加人员json数据
 * @returns {Function}
 */
export function fetchAddMaintain(token,managerJson) {
        return dispatch => {
            dispatch(fetchMaintainResult());//正在获取数据，进度条提示
            let body = JSON.stringify({
                token: token
            });
            return requestAPI({
                path: 'Accounts',
                method: 'POST',
                params:managerJson
            }).then((responseData) => {
                if(responseData.error&&responseData.error.statusCode == 422){
                    if(responseData.error.details.messages){
                        if(responseData.error.details.messages.email&&
                            responseData.error.details.messages.username){
                            message.warning('邮箱和账号已注册过，请重新更换邮箱和账号');
                        }else if(responseData.error.details.messages.email){
                            message.warning('邮箱已注册过，请重新更换邮箱');
                        }else if(responseData.error.details.messages.username){
                            message.warning('账号已注册过，请重新更换账号');
                        }
                    }
                }else if(responseData.error&&responseData.error.statusCode==401){
                    message.warning('对不起，您没有添加人员权限，请示管理员或超级管理员操作此功能');
                }else if(responseData.error&&responseData.error.name=="Error"){
                    message.error('更新失败');
                }else if(responseData.id != null || responseData.id != ""){
                    message.success('添加成功');
                }
            })
        };
}
/**
 * 获取人员信息
 * @param token
 * @param accountId
 * @returns {Function}
 */
export function fetchPersonInfo(token,accountId) {
    return dispatch => {
        dispatch(fetchMaintainResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        return requestAPI({
            path: 'Accounts/' + accountId,
            method: 'GET'
        }).then((responseData) => {
            console.log(responseData);
            dispatch(receivePsersonInfo(responseData));
        })
    }
}

export function fetchEditInformation(account) {
    return {
        type: types.RECEIVE_EDIT_INFORMATION,
        account: account
    }
}

export function fetchModifyPassword(account) {
    return {
        type: types.RECEIVE_MODIFY_PASSWORD,
        account: account
    }
}

/**
 *  修改个人信息
 * @param id
 * @param params
 * @returns {Function}
 * @constructor
 */
export function UpdateRoleInfo(id,params){
    var accountId={ "id":id };
    return dispatch => {
        return requestAPI({
            path:'Accounts/update?where=' + encodeURIComponent(JSON.stringify(accountId), "UTF-8"),
            method:'POST',
            params:params
        }).then((responseData) => {
            if(responseData.count>0){
                message.success('修改更新成功');
            }else if(responseData.error&&responseData.error.statusCode == 422){
                message.warning('邮箱已注册过，请重新更换邮箱');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有修改权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('更新失败');
            }
        })
    }
}

/**
 *  重置密码
 * @param id
 * @param params
 * @returns {Function}
 * @constructor
 */
export function UpdateRolePassword(params){
        return dispatch => {
            return requestAPI({
                path:'Accounts/resetPassword',
                method:'POST',
                params:params
            }).then((responseData) => {
                if(responseData.result&&responseData.result.ret == 1){
                    message.success('重置密码成功');
                    alert("请及时修改重置后生成的随机密码：" + params.password + "谢谢您的使用！");
                }else if(responseData.error&&responseData.error.statusCode==401){
                    message.warning('对不起，您没有重置密码权限，请示管理员或超级管理员操作此功能');
                }else{
                    message.error('重置密码失败，请刷新页面重试~');
                }
            })
        };
}

/**
 *  修改密码
 * @param id
 * @param params
 * @returns {Function}
 * @constructor
 */
export function UpdatePassword(params){
    return dispatch => {
        return requestAPI({
            path:'Accounts/ChangePassword',
            method:'POST',
            params:params
        }).then((responseData) => {
            if(responseData.result&&responseData.result.ret == 1){
                message.success('修改密码成功');
            }else if(responseData.error&&responseData.error.statusCode==401){
                message.warning('对不起，您没有修改密码权限，请示管理员或超级管理员操作此功能');
            }else{
                message.error('修改密码失败，请刷新页面重试~');
            }
        })
    }
}