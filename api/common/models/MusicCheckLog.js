/**
 * Created by HULL on 2017/2/20.
 * 审核记录表
 */
'use strict';

module.exports = function(MusicCheckLog) {

  MusicCheckLog.beforeRemote('create',function(ctx, modelInstance, next){//post请求时//请求调用接口之前
    var req=ctx.req;
    if(req.body.name==null||req.body.name==""){
      var result ={"ret":"-1","msg":"缺少参数","statusCode":401};
      next(result);
    }else{
      var moment = require('moment');
      var time=moment().format('YYYY-MM-DD HH:mm:ss');
      req.body.createTime=time;
      req.body.sortTime=time;
      next();
    }
  });
};
//http://127.0.0.1:3001/api/Scenes/2/downloadMusic?file=singer_musicName.jpg
