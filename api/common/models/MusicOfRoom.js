/**
 * 房间维护下的情景内的歌曲
 */
'use strict';

module.exports = function(MusicOfRoom) {

  MusicOfRoom.MusicOfRoomUpdatemusic =function(req,res,body,ctx,cb){

    var req = ctx.req;

    for(var i=0;i<req.body.prams.length;i++){
      var index=0;
      MusicOfRoom.create(req.body.prams[i],function(err, obj){
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

  MusicOfRoom.remoteMethod('MusicOfRoomUpdatemusic', getremoteMethodPamas("MusicOfRoomUpdatemusic","添加歌曲到情景下"));
};
