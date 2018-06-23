'use strict';

import * as data from '../constants/VirtualData';
import GlobalVariable from '../constants/GlobalVariable';
export function request(url, method, body, headers) {
  console.log('url = ', url);
  var isOk;
  return new Promise((resolve, reject) => {
    // const timeoutId = setTimeout(() => reject(new Error('request timeout')), 30000);
    // fetch(url, {
    //     method: method,
    //     headers: headers,
    //     body: body,
    //   })
    //   .then((response) => {
    //     if (response.ok) {
    //       isOk = true;
    //     } else {
    //       isOk = false;
    //     }
    //     return response.json();
    //   })
    //   .then((responseData) => {
    //     clearTimeout(timeoutId);
    //     if (isOk) {
    //       console.log('responseData = ', responseData);
    //       resolve(responseData);
    //     } else {
    //       reject(responseData);
    //     }
    //   })
    //   .catch((error) => {
    //     clearTimeout(timeoutId);
    //     reject(error);
    //   });

    resolve(getResponseData(url));
  })
}

function getResponseData(url) {
  if (url.indexOf("logined") > 0)
    return data.LOGIN_DATA;
  else if (url.indexOf("menu")>0 && localStorage.getItem("PersonnelLogin")=='MaintenancePersonnel')
    return data.MAIN_MENU_DATA;
  else if(url.indexOf("menu")>0 && localStorage.getItem("PersonnelLogin")=='clientPersonnelLogin')
    return data.CLIENT_MAIN_MENU_DATA;
  else if(url.indexOf("room")>0)
    return data.ROOM_MAINTENANCE_DATA;
  else if(url.indexOf("maintain")>0)
    return data.MAINTAIN_PERSON_LIST_DATA;
  else if(url.indexOf("scene")>0)
    return data.SCENE_MAINTENANCE_DATA;
  else if(url.indexOf("songs")>0)
    return data.SONGS_MAINTENANCE_DATA;
  else if(url.indexOf("musicstore")>0)
    return data.SONGS_MAINTENANCE_DATA;
  else if(url.indexOf("musictype")>0)
    return data.SCENE_LIST_DATA;
  else if(url.indexOf("clientloginaccount")>0)
      return data.CLIENT_LOGINACCOUNT_DATA;
  else if(url.indexOf("musicstatistical")>0)
      return data.MUSIC_STATISTICAL_DATA;
  else if(url.indexOf("panelmaintenance")>0)
      return data.PANEL_MAINTAIN_DATA;
}

// export function showAlert(error) {
//   let errorContent = '网络请求失败，请稍后再试！'
//   let errorTitle = '当前网络异常！'
//   if(error == 'Error: request timeout')
//     errorContent = '网络请求超时，请检查网络后再试！'
//   Alert.alert(errorTitle, errorContent, [{text: '好'},]);
// }

export function requestAPI(params) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const token = localStorage.getItem('accessToken');

    if (token) {
        headers['Authorization'] = token;
    }

    const method = params.method || 'GET';

    const requestParams = {
        method,
        headers: new Headers(headers)
    };
    
    if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
        requestParams.body = JSON.stringify(params.params || {});
    }
    
  return new Promise((resolve, reject) => {
    fetch(GlobalVariable.IP + params.path || '', requestParams)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            resolve(responseData);
        });
  })
}


export function uploadFileAPI(params) {
    const headers = {};
    const token = localStorage.getItem('accessToken');
    if (token) {
        headers['Authorization'] = token;
    }
    const requestParams = {
        method: 'POST',
        headers: new Headers(headers)
    };
        
    var formData  = new FormData();
    formData.append('file', params.file);

    requestParams.body =formData;
    
    return new Promise((resolve, reject) => {
        fetch(GlobalVariable.IP + params.path || '' , requestParams)
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                resolve(responseData);
            });
    })
}