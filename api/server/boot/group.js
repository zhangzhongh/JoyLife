module.exports = function(app,cb) {
  var Panel=app.models.Panel;
  var Scene=app.models.Scene;
  var Music=app.models.Music;
  var Registrator=app.models.Registrator;

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
    var bakpath=path.join(__dirname,'../json/musicStore.json');
    fs.writeFile(bakpath, JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log('It\'s saved!'); //文件被保存
    });
  }, 3000);

  cb();
};
