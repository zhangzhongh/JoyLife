// 定义角色
// uploader\verifier\topVerifier\manager\admin
//clientUploader 客户端注册人员角色上传权限

module.exports = function(app) {
  var Role = app.models.Role;
  var Account = app.models.Account;
  var Registrator = app.models.Registrator;

  /**
   *  上传权限 后台
   */
  Role.registerResolver('uploader', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Account.findById(userId,function(err,user) {
        if (err || !user)
            return reject();
        if(user.role != "uploader"){
          return cb(null, false);
        }else{
          cb(null, true);
        }
    });
  });

  /**
   * 审核权限
   */
  Role.registerResolver('verifier', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Account.findById(userId,function(err,user) {
      if (err || !user)
        return reject();
      if(user.role != "verifier"){
        return cb(null, false);
      }else{
        cb(null, true);
      }
    });
  });
  /**
   * 二级审核权限
   */
  Role.registerResolver('topVerifier', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Account.findById(userId,function(err,user) {
      if (err || !user)
        return reject();
      if(user.role != "topVerifier"){
        return cb(null, false);
      }else{
        cb(null, true);
      }
    });
  });
  /**
   * 管理员权限
   */
  Role.registerResolver('manager', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Account.findById(userId,function(err,user) {
      if (err || !user)
        return reject();
      if(user.role != "manager"){
        return cb(null, false);
      }else{
        cb(null, true);
      }
    });
  });
  /**
   * 超级管理员权限
   */
  Role.registerResolver('admin', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, true);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Account.findById(userId,function(err,user) {
      if (err || !user)
        return reject();
      if(user.role != "admin"){
        return cb(null, false);
      }else{
        cb(null, true);
      }
    });
  });

  /**
   * 客户端用户权限
   */
  Role.registerResolver('clientUploader', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, true);
      });
    }
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }
    // check userId's role type
    Registrator.findById(userId,function(err,user) {
      if (err || !user)
        return reject();
      if(user.role != "clientUploader"){
        return cb(null, false);
      }else{
        cb(null, true);
      }
    });
  });

};
