'use strict';

module.exports = function(Scene) {
    var storage = require('loopback-component-storage');
    var fs= require('fs');
    var path = require('path');
    var storageService = new storage.StorageService({ root: path.join(__dirname, 'storage'), provider: 'filesystem'});

    Scene.upload = function(id, singer, musicName, req, res, cb) {
        var containerPath=path.join(__dirname, 'storage', id);
        if( fs.existsSync(containerPath) ==false){
            fs.mkdirSync(containerPath);
        }

        req.params['container']=id;

        storageService.upload(req, res,
            {
                getFilename: function(file, req, res) {
                    //更换上传文件的名字
                    var _ext=file.name.substring(file.name.lastIndexOf("."));
                    return singer + '_' + musicName + _ext;
                }
            },
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
	Scene.remoteMethod(
        'upload',
        {
            http: {path:'/:id/uploadMusic/:singer/:musicName', verb:'post'},
            accepts:[
                {arg: 'id', type:'string'},
                {arg: 'singer', type:'string'},
                {arg: 'musicName', type:'string'},
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'res', type: 'object', 'http': {source: 'res'}}
            ],
            returns: {arg: 'isPass',type:'boolean'}
        }
	);

    Scene.download = function(id, file, req, res, cb) {
        storageService.download(id, file, req, res,
            function(err, result) {
                if (err) {
                    cb(err);
                } else {
                    cb(res);
                }
            }
          );
    };
	Scene.remoteMethod(
        'download',
        {
            http: {path:'/:id/downloadMusic', verb:'get'},
            accepts:[
                {arg: 'id', type:'string'},
                {arg: 'file', type:'string'},
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'res', type: 'object', 'http': {source: 'res'}}
            ]
        }
    );

};
