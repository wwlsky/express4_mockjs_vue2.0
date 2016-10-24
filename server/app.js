var express = require('express');
var glob = require('glob');
var bodyParser = require('body-parser');
var access = require('access-control'); //跨域请求
var helmet = require('helmet');         //安全防御

var app = module.exports = express();

// 跨域配置
var cors = access({
  maxAge: '1 hour',
  credentials: true,
  origins: 'http://localhost:8080' // 设置允许跨域地址
});


// 跨域访问设置
app.use(function(req, res, next) {
  if (cors(req, res)) return;
  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 构建控制器目录
var controllers = glob.sync('./controllers/**/*.js', { cwd: __dirname });
controllers.forEach(function(controller){
  require(controller)(app);
});

app.use(function(err, req, res, next) {
  if (err.status && err.status === 403 && err.message && err.message === 'invalid csrf token') {
    // your handler
  } else {
    next(err, req, res);
  }
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

if (!module.parent) {
  var server = app.listen(process.env.PORT || 3000, function(){
      var host = server.address().address;
      var port = server.address().port;
      console.log('app listening at http://%s:%s', host, port);
  });
}