'use strict';
var loopback = require('loopback');
var MusicCheckLog = loopback.getModel('MusicCheckLog');
var Account = loopback.getModel('Account');

module.exports = function(Music) {

  Music.beforeRemote('create',function(ctx, modelInstance, next){//post请求时//请求调用接口之前
    var req=ctx.req;
    if(req.body.name==null||req.body.name==""||req.body.singer==null||req.body.singer==""||req.body.uploadDir==null||req.body.uploadDir==""){
      var result ={"ret":"-1","msg":"缺少参数","statusCode":401};
      next(result);
    }else{
      var filter = {
        where: {role:'verifier'}
      };
      Account.find(filter,function(err,result){
        if(err){
          console.log(err);
        }else if(result){
          for(var i=0;i<result.length;i++){
            var results=result[i];
            var params=req.body;
            params.auditor=results.username;
            params.auditorId=results.id;
            MusicCheckLog.create(params,function(err,obj){
              if(err){
                console.log(err)
              }
            })
          }
        }
      });

      next();
    }
  });

    //最新置项功能
    Music.setStickNew = function(id, topOrNot, cb) {
        Music.findById(id,function(err,music){
                if(err)  return cb(err);
                if(!music) return cb({'error':'找不到置项的项'});

                music.updateAttribute('topOrNot',topOrNot);
                cb(null,true);
            });
    };

	Music.remoteMethod(
        'setStickNew',
        {
            http: {path:'/:id/setStickNew', verb:'PATCH'},
            accepts:[
                {arg: 'id', type:'string'},
                {arg: 'topOrNot', type:'boolean'}
            ],
			returns: {arg: 'topOrNot',type:'boolean'}
        }
    );
  //音乐库搜索接口
  Music.searchData =function(req,res,body,ctx,cb){
    if(body.keyword && body.keyword != '') {
      var query ={and: [{or:[{name: {like: '%'+body.keyword+'%'}},{singer:{like:'%'+body.keyword+'%'}},{describe:{like:'%'+body.keyword+'%'}}]},{auditStatus: '已通过'}]};
      this.find({where: query}, function (err, result) {
        if (err){
          cb(null,"查询失败");
        } else if (result) {
          cb(null,result);
        }

      });
    }else {
      cb(null,"缺少参数");
    }
  };

  Music.CreateMusic =function(req,res,body,ctx,cb){

    var req = ctx.req;

    for(var i=0;i<req.body.prams.length;i++){
      var index=0;
      Music.create(req.body.prams[i],function(err, obj){
        index++;
        if(err){
          cb(null,{"ret":-1,"msg":err});
          return;
        }else{
          if (index==req.body.prams.length){
            cb(null,{"ret":0,"msg":"操作成功"});
          }
        }
      });
    }

  };

  function getremoteMethodPamas(path,description){
    var pamas={
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
        {arg: 'body', type: 'object', 'http': {source: 'body'}},
        {arg: 'context', type: 'object', 'http': {source: 'context'}}
      ],
      description:description,
      http:{path:'/'+path},
      returns: {type: 'object',root: true}
    };
    return pamas
  }

  Music.remoteMethod('searchData', getremoteMethodPamas("searchData","获取音乐搜索数据"));
  Music.remoteMethod('CreateMusic', getremoteMethodPamas("CreateMusic","添加声库声音"));
};
