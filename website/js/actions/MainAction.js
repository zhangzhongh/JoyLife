import * as types from '../constants/ActionTypes';
import {MENU_URL} from '../constants/Network';
import { request,uploadFileAPI } from '../utils/RequestUtils';

export function change_nav_menu(index) {
    return {
        type: types.CHANGE_NAV_MENU,
        index: index
    }
}

export function change_module(index) {
    return {
        type: types.CHANGE_MODULE,
        index: index
    }
}

export function fetchMenu(token) {
    return dispatch => {
        dispatch(fetchMenuResult());//正在获取数据，进度条提示
        let body = JSON.stringify({
            token: token
        });
        return request(MENU_URL, 'post', body, {'Accept': 'application/json', 'Content-Type': 'application/json',})
            .then((responseData) => {
                dispatch(receiveMenuResult(responseData));
            })
            .catch((error) => {
                console.error('fetchAnswer error: ' + error);
                dispatch(receiveMenuResult([]));
            })
    }
}

function fetchMenuResult() {
    return {
        type: types.FETCH_MENU_RESULT
    }
}

function receiveMenuResult(responseData) {
    return {
        type: types.RECEIVE_MENU_RESULT,
        rawData: responseData
    }
}

export function uploadFiletest(files) {
    var singer='测试歌手名字';
    var musicName='测试歌曲名字';

    return dispatch => {
        files.forEach((file)=> {
            uploadFileAPI({
                path:'Scenes/1/uploadMusic/'+ singer +'/' + musicName,
                file:file
            })
            .then((responseData) => {
                    console.log('responseData:'+responseData);
            });
        });
    }

}