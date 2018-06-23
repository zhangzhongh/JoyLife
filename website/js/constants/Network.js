var IP = 'http://192.168.160.84:8081';

{ /** 登录**/ }
var LOGIN_URL = IP + '/bpm/task/logined.do?';
exports.LOGIN_URL = LOGIN_URL;

{ /* 主菜单*/ }
var MENU_URL = IP + '/bpm/task/menu.do';
exports.MENU_URL = MENU_URL;

{/*房间维护*/}
var ROOM_URL = IP + '/bpm/task/room.do';
exports.ROOM_URL = ROOM_URL;

{/*人员维护*/}
var MAINTAIN_URL = IP + '/bpm/task/maintain.do';
exports.MAINTAIN_URL = MAINTAIN_URL;

{/*情景维护*/}
var SCENE_URL = IP + '/bpm/task/scene.do';
exports.SCENE_URL = SCENE_URL;

{/*推荐歌曲维护*/}
var SONGS_URL = IP + '/bpm/task/songs.do';
exports.SONGS_URL = SONGS_URL;

{/*音乐库*/}
var MUSICSTORE_URL = IP + '/bpm/task/musicstore.do';
exports.MUSICSTORE_URL = MUSICSTORE_URL;

{/*音乐分类*/}
var MUSICSCENE_URL = IP + '/bpm/task/commendscene.do';
exports.MUSICSCENE_URL = MUSICSCENE_URL;

{/*客户端登录次数统计*/}
var CLIENTLOGINACCOUNT_URL = IP + '/bpm/task/clientloginaccount.do';
exports.CLIENTLOGINACCOUNT_URL = CLIENTLOGINACCOUNT_URL;

{/*歌曲统计*/}
var MUSICSTATISTICAL_URL = IP + '/bpm/task/musicstatistical.do';
exports.MUSICSTATISTICAL_URL = MUSICSTATISTICAL_URL;

{/*标题栏维护*/}
var PANELMAINTAIN_URL = IP + '/bpm/task/panelmaintenance.do';
exports.PANELMAINTAIN_URL = PANELMAINTAIN_URL;

{/*审核*/}
var AUDITMUSICSTORE_URL = IP + '/bpm/task/musiccheck.do';
exports.AUDITMUSICSTORE_URL = AUDITMUSICSTORE_URL;