'use strict';

module.exports = function(Account) {
  Account.login = function(credentials,include,cb) {
    var query = this.normalizeCredentials(credentials, true,"");
    this.findOne({where:query},function(err,account) {
      var defaultError = new Error('login failed');
      defaultError.statusCode = 401;
      defaultError.code = 'LOGIN_FAILED';

      function tokenHandler(err, token) {
        if (err) return cb(err);
        account.verificationToken = token.id;
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
            console.log(err);
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
   *  重置密码  接口
   * @param options
   * @param cb
   */
  Account.resetPassword = function(options, cb) {
    this.findOne({ "where" : { "id":options.id }},function(err,account) {
      if(err){
        return  cb(null,{"ret":-1,"msg":"失败"});
      }
      var pwd=Account.hashPassword(options.password);
      account.password=pwd;
      account.save(function(err) {
        if(err) {
          cb(null,{"ret":-1,"msg":"重置密码失败"});
        }else{
          cb(null,{"ret":1,"msg":"重置密码成功"});
        }
      });
    });
  };
  Account.remoteMethod(
    'resetPassword',
    {
      description: '重置密码.',
      accepts: [
        {arg: 'options', type: 'object', required: true, http: {source: 'body'}}
      ],
      http: {verb: 'post', path: '/resetPassword'},
      returns: {arg: 'result',type:'string'}
    }
  );

  /**
   *  修改密码  接口
   *  @param userId
   *  @param oldPassword
   *  @param newPassword
   * @param options
   * @param cb
   */
  Account.ChangePassword = function(userId, oldPassword, newPassword, cb) {
      Account.changePassword(userId, oldPassword, newPassword, function(err){
        if(err){
          cb(null,{"ret":-1,"msg":"修改密码失败"});
        }else{
          cb(null,{"ret":1,"msg":"修改密码成功"});
        }
      })

  };

  Account.remoteMethod(
    'ChangePassword',
    {
      description: '修改密码.',
      accepts: [
        {arg: 'id', type: 'any',
          http: ctx => ctx.req.accessToken && ctx.req.accessToken.userId
        },
        {arg: 'oldPassword', type: 'string', required: true},
        {arg: 'newPassword', type: 'string', required: true}
      ],
      http: {verb: 'post', path: '/ChangePassword'},
      returns: {arg: 'result',type:'string'}
    }
  );

};
