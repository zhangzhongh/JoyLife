/**
 * 房间维护
 */
'use strict';

module.exports = function(Room) {
  var storage = require('loopback-component-storage');
  var fs= require('fs');
  var path = require('path');
  var storageService = new storage.StorageService({ root: path.join(__dirname, 'storage'), provider: 'filesystem'});

  Room.upload = function(roomImgfile, roomImgName, req, res, cb) {
    var containerPath=path.join(__dirname, 'storage', roomImgfile);
    if( fs.existsSync(containerPath) ==false){
      fs.mkdirSync(containerPath);
    }

    req.params['container']=roomImgfile;

    storageService.upload(req, res,
      /*{
        getFilename: function(file, req, res) {
          //更换上传文件的名字
          var _ext=file.name.substring(file.name.lastIndexOf("."));
          return roomImgName + _ext;
        }
      },*/
      function(err, result) {
        if (!err) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(result);
        } else {
          res.status(500).send(err);
        }
        cb(res);
      }
    );
  };
  Room.remoteMethod(
    'upload',
    {
      http: {path:'/:roomImgfile/uploadRoomImg/:roomImgName', verb:'post'},
      accepts:[
        {arg: 'roomImgfile', type:'string'},
        {arg: 'roomImgName', type:'string'},
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {arg: 'isPass',type:'boolean'}
    }
  );

  Room.download = function(roomImgfile, file, req, res, cb) {
    storageService.download(roomImgfile, file, req, res,
      function(err, result) {
        if (err) {
          cb(err);
        } else {
          cb(res);
        }
      }
    );
  };
  Room.remoteMethod(
    'download',
    {
      http: {path:'/:roomImgfile/downloadRoomImg', verb:'get'},
      accepts:[
        {arg: 'roomImgfile', type:'string'},
        {arg: 'file', type:'string'},
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ]
    }
  );

};
