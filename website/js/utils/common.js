/*
* 音乐试听方法
* */
import GlobalVariable from '../constants/GlobalVariable';
export function __musicAudition__(singer,name,url){
const musicUrl=GlobalVariable.IP+url;
        const args = {
        message: '试听：' + singer + '--' + name,
        description: 
            <audio controls autoplay>
                <source src={musicUrl} type="audio/mpeg"/>
                您的浏览器不支持在线播放，请更换更高版本的浏览器。
            </audio>,
        duration: 0,
    };
    let {notification} = require('antd');
    return antd.notification.open(args);
}
