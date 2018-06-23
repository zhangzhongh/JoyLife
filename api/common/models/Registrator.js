/**
 * Created by wz on 17/2/28.
 */
'use strict';
var loopback = require('loopback');
var Panel = loopback.getModel('Panel');
var Scene = loopback.getModel('Scene');
var Music = loopback.getModel('Music');
module.exports = function(Registrator) {
  Registrator.login = function(credentials,include,cb) {
    var query = this.normalizeCredentials(credentials, true,"");
    this.findOne({where:query},function(err,account) {
      var defaultError = new Error('login failed');
      defaultError.statusCode = 401;
      defaultError.code = 'LOGIN_FAILED';

      function tokenHandler(err, token) {
        if (err) return cb(err);
        account.verificationToken = token.id;
        var moment = require('moment');
        var time=moment(account.createTime).format('YYYY-MM-DD HH:mm:ss');
        account.createTime = time;
        token.userInfo=account;
        account.save(function(err) {
          if(err) {
            cb(err);
          }else{
            cb(null,token);
          }
        });
      }

      if (err){
        cb(defaultError);
      } else if (account) {
        account.hasPassword(credentials.password, function(err,isMatch) {
          if (err) {
            cb(defaultError);
          } else if (isMatch) {
            account.createAccessToken({ttl:12345,roleId:account.id},tokenHandler);
          } else {
            defaultError.statusCode = 402;
            defaultError.code = 'PWD_INVALID';
            cb(defaultError);
          }
        });
      } else {
        cb(defaultError);
      }
    });

    return cb.promise;
  };

  /**
   *  修改密码  接口 客户端
   * @param options
   * @param cb
   */
  Registrator.resetPassword = function(options, cb) {
    this.findOne({ "where" : { "id":options.id }},function(err,account) {
      if(err){
        return  cb(null,{"ret":-1,"msg":"失败"});
      }
      var pwd=Registrator.hashPassword(options.password);
      account.password=pwd;
      account.save(function(err) {
        if(err) {
          cb(null,{"ret":-1,"msg":"重置密码失败"});
        }else{
          cb(null,{"ret":1,"msg":"重置密码成功"});
        }
      });
    });

    /*this.findOne({ "where" : { "id":options.id }},function(err,account) {
      var pwd=Registrator.hashPassword(options.password);
      var forwardFilter={ "id" : options.id };
      //更新的值
      var forwardData={ "password" : pwd };
      //更新加密过的password
      Registrator.update(forwardFilter,forwardData,function(err,cobj){
        if(err){
          console.log('失败')
          cb(null,{"ret":-1,"msg":"重置密码失败"});
        }else{
          console.log('成功')
          cb(null,{"ret":1,"msg":"重置密码成功"});
        }
      });
    });*/
  };
  Registrator.remoteMethod(
    'resetPassword',
    {
      description: 'Reset password for a user with userId.',
      accepts: [
        {arg: 'options', type: 'object', required: true, http: {source: 'body'}}
      ],
      http: {verb: 'post', path: '/resetPassword'},
      returns: {arg: 'result',type:'string'}
    }
  );

  Registrator.getMusicStoreData=function(req,res,cb){
    var fs = require('fs');
    var path = require('path');
    //查找文件路径，引入path包
    var file_path=path.join(__dirname,'../../server/json/musicStore.json');
    fs.readFile(file_path, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
      if (err){
        console.log(err+",,"+file_path);
        cb(err);
      }else {
        res=JSON.parse(data);
        cb(null,res);
        getMusicStore();
      }
    });
  };

  function getMusicStore(){
    var data={};

    Panel.find({},function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.panel=result;
      }
    });

    var scenefilter = {
      order: "createTime desc"
    };
    Scene.find(scenefilter,function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.scene=result;
      }
    });

    var newfilter = {
      where: {auditStatus:'已通过'},
      order: ["topOrNot desc","createTime desc"]
    };
    Music.find(newfilter,function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.newMusic=result;
      }
    });

    var hotfilter = {
      where: {auditStatus:'已通过'},
      order: "hitCount desc"
    };
    Music.find(hotfilter,function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.hotMusic=result;
      }
    });

    var superfilter = {
      where: {and: [{sceneId: '6'}, {or:[{auditStatus:'已通过'},{auditStatus:'已添加'}]}]},
      order: "createTime desc"
    };
    Music.find(superfilter,function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.superMusic=result;
      }
    });

    var makerfilter = {
      order: "uploadAccount desc"
    };
    Registrator.find(makerfilter,function(err,result){
      if(err){
        console.log(err);
      }else if(result){
        data.makerMusic=result;
      }
    });

    setTimeout(function() {
      //将转换后的json写入到musicStore.json文件里面
      var fs= require('fs');
      var path = require('path');
      //查找文件路径，引入path
      var bakpath=path.join(__dirname,'../../server/json/musicStore.json');
      fs.writeFile(bakpath, JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('It\'s saved!'); //文件被保存
      });
    }, 3000);
  }

  function getremoteMethodPamas(path,description){
    var pamas={
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      description:description,
      http:{path:'/'+path,verb:'get'},
      returns: {type: 'object',root: true}
    };
    return pamas
  }

  Registrator.remoteMethod('getMusicStoreData', getremoteMethodPamas("getMusicStoreData","获取音乐库首页数据"));
};
