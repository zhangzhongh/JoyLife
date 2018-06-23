export const LOGIN_DATA = {
    post: '六级领导',
    email: '',
    name: '张三',
    userId: 169,
    firstLogin: false,
    code: 'success',
    dept: '技术部',
    companyName: 'XX集团',
    msg: '登入成功！',
    telephone: '15102113061'
};

export const MAIN_MENU_DATA = [
{
  title:'声库',
  icon: require('../containers/MainContainer/img/MusicStore.png'),
  modules:[{
    title:'分类维护',
    panels:[{
      title:'推荐情景',
      page:'SceneContainer'
    },{
      title:'最热',
      page:'HotMusicContainer'
    },{
      title:'最新',
      page:'NewMusicContainer'
    },{
      title:'声音创客',
      page:'MakerContainer'
    },{
      title:'声音超市',
      page:'SupermarketMusicContainer'
    }
    ]
  },{
    title:'审核声音',
    page:'MusicCheckListContainer'
  },{
    title:'标题栏维护',
    page:'PanelMaintainContainer'
  }/*,{
    title:'商城地址维护',
    page:'StoreAddressMaintainContainer'
  }*/]
},{
  title:'房间维护',
  icon: require('../containers/MainContainer/img/room.png'),
  modules:[{
    title:'房间维护',
    page:'RoomMaintenanceList'
  }]
},{
  title:'统计',
  icon: require('../containers/MainContainer/img/tongji.png'),
  modules:[{
    title:'用户统计',
    panels:[{
      title:'客户端注册用户统计',
      page:'clientLoginAccount'
    }]
  },{
    title:'声音统计',
    page:'musicStatistical'
  }]
},{
  title:'权限管理',
  icon: require('../containers/MainContainer/img/quanxian.png'),
  modules:[{
    title:'平台维护人员管理',
    panels:[{
      title:'增加维护人员',
      page:'addMaintainPerson'
    },{
      title:'维护人员列表',
      page:'maintainPersonList'
    }]
  }]
}];

export const CLIENT_MAIN_MENU_DATA = [
  {
    title:'客户端上传声音',
    icon: require('../containers/MainContainer/img/shangchuan.png')
  }];

export const ROOM_MAINTENANCE_DATA = [
  {
    key: '1',
    id: '1',
    sort:'1',
    name: '客厅',
  },
  {
    key: '2',
    id: '2',
    sort:'2',
    name: '卧室',
  },
  {
    key: '3',
    id: '3',
    sort:'3',
    name: '厨房',
  },
  {
    key: '4',
    id: '4',
    sort:'4',
    name: '书房',
  },
  {
    key: '5',
    id: '5',
    sort:'5',
    name: '洗漱室',
  },
];

export const SCENE_LIST_DATA = [
  {
    id: '1',
    editable: false,
    sceneName:'跑步'

  }, {
    id: '2',
    editable: false,
    sceneName: '旅行'
  },{
    id: '3',
    editable: false,
    sceneName:'驾车'
  }, {
    id: '4',
    editable: false,
    sceneName:'聚会'
  },{
    id: '5',
    editable: false,
    sceneName:'跑步'
  }, {
    id: '6',
    editable: false,
    sceneName:'旅行'
  },{
    id: '7',
    editable: false,
    sceneName:'驾车'
  }, {
    id: '8',
    editable: false,
    sceneName:'聚会'
  }
];
export const MAINTAIN_PERSON_LIST_DATA = [
  {
    id: '1',
    nickname: '小月亮',
    gender:'女',
    age:'18',
    work:'助理',
    hobby:[{
      music:'唱歌',
      dancer:'跳舞',
      sport:'运动',
      movie:'电影'
    }]
  }, {
    id: '2',
    nickname: '闷油瓶',
    gender:'男',
    age:'20',
    work:'考古学家',
    hobby:[{
      music:'唱歌'
    }]
  },{
    id: '3',
    nickname: '天空',
    gender:'男',
    age:'23',
    work:'策划',
    hobby:[{
      music:'唱歌',
      sport:'运动'
    }]
  }, {
    id: '4',
    nickname: '奥特曼',
    gender:'男',
    age:'8',
    work:'学生',
    hobby:[{
      music:'唱歌',
      dancer:'跳舞',
      sport:'运动'
    }]
  },{
    id: '5',
    nickname: '小苹果',
    gender:'女',
    age:'22',
    work:'会计',
    hobby:[{
      music:'唱歌',
      dancer:'跳舞',
      movie:'电影'
    }]
  }
];

//房间维护内的 情景维护数据
export const SCENE_MAINTENANCE_DATA = [
  {
    key: '1',
    id: '1',
    sort:'1',
    scene:'晒太阳'
  },
  {
    key: '2',
    id: '2',
    sort:'2',
    scene:'休闲'
  },
  {
    key: '3',
    id: '3',
    sort:'3',
    scene:'日光浴'
  }
];

//推荐歌曲维护数据
export const SONGS_MAINTENANCE_DATA=[
  {
    key: '1',
    id: '1',
    song: "Jar of Love",
    singer:"曲婉婷",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"jaroflove.mp3"
  },{
    key: '2',
    id: '2',
    song: "小幸福",
    singer:"白静晨",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"xiao.mp3"
  },{
    key: '3',
    id: '3',
    song: "一次就好",
    singer:"杨宗纬",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"yicijiuhao.mp3"
  },{
    key: '4',
    id: '4',
    song: "History",
    singer:"EXO",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"history.mp3"
  },{
    key: '5',
    id: '5',
    song: "梨花落",
    singer:"霍尊",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"lihua.mp3"
  },{
    key: '6',
    id: '6',
    song: "我好想你",
    singer:"苏打绿",
    img:require('../containers/RoomMaintenance/img/yinyue.png'),
    url:"xiangni.mp3"
  }
];

//客户端登录次数统计数据
export const CLIENT_LOGINACCOUNT_DATA=[
  {
    id: '1',
    name: "张三",
    phone:"18236915213",
    account:"11",
    time:"2017-02-15 9:30:00"
  },{
    id: '2',
    name: "李四",
    phone:"18236915214",
    account:"18",
    time:"2017-02-15 10:30:00"
  },{
    id: '3',
    name: "王五",
    phone:"18236915215",
    account:"21",
    time:"2017-02-15 9:20:00"
  },{
    id: '4',
    name: "马六",
    phone:"18236915216",
    account:"15",
    time:"2017-02-15 9:50:00"
  },{
    id: '5',
    name: "赵强",
    phone:"18236915217",
    account:"17",
    time:"2017-02-15 9:40:00"
  },{
    id: '6',
    name: "周建",
    phone:"18236915218",
    account:"5",
    time:"2017-02-15 10:30:00"
  }
];

//歌曲统计数据
export const MUSIC_STATISTICAL_DATA=[
  {
    type: "原创歌曲",
    account: '100',
    passcheck: "70",
    nopasscheck:"10",
    passed:"80",
    passing:"20"
  },{
    type: "翻唱歌曲",
    account: '200',
    passcheck: "120",
    nopasscheck:"30",
    passed:"150",
    passing:"50"
  },{
    type: "原创声音",
    account: '50',
    passcheck: "20",
    nopasscheck:"10",
    passed:"30",
    passing:"20"
  }
];

//标题栏数据
export const PANEL_MAINTAIN_DATA=[
  {
    id: "1",
    name: '原创音乐人',
    content: "这是一个北漂音乐人的故事",
    type:"广告",
    url:"http://www.baidu.com",
    updatePerson:"张三",
    updateTime:"2017-02-15 10:30:00"
  },{
    id: "2",
    name: '网络流行视频',
    content: "这是一个最近网络点击量最高的视频",
    type:"视频",
    url:"http://www.baidu.com",
    updatePerson:"张三",
    updateTime:"2017-02-15 10:30:00"
  },{
    id: "3",
    name: '在线商城',
    content: "这里你可以买到你喜欢的产品",
    type:"应用",
    url:"http://www.baidu.com",
    updatePerson:"张三",
    updateTime:"2017-02-15 10:30:00"
  },{
    id: "4",
    name: '一首老歌',
    content: "这是一首经典老歌",
    type:"音乐",
    url:"http://www.baidu.com",
    updatePerson:"李四",
    updateTime:"2017-02-15 11:20:00"
  },{
    id: "5",
    name: '洛阳老家',
    content: "这是一个系列歌曲活动",
    type:"广告",
    url:"http://www.baidu.com",
    updatePerson:"李四",
    updateTime:"2017-02-15 10:30:00"
  },{
    id: "6",
    name: '洛阳风景',
    content: "这是一个古老的城市",
    type:"广告",
    url:"http://www.baidu.com",
    updatePerson:"李四",
    updateTime:"2017-02-15 12:30:00"
  }
];