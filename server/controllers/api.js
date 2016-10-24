var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('jsonwebtoken'); //生成token
var expJwt = require('express-jwt'); //验证token
// models
var Users = require('../models/users');

module.exports = function(app) {
    app.use('/api', router);
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    //res.send('api server.');
    console.log(req.csrfToken());
    res.json({
        csrfToken: req.csrfToken()
    });
});

router.get('/users', function(req, res, next) {
    var data = Users.list();
    res.json(data);
});

router.get('/test', function(req, res, next) {
    var data = Users.test();
    res.jsonp(data);
});

/**
 * 登录逻辑
 * 1、首次判断用户名密码是否正确
 * 2、用户名密码正确，生成token
 * 3、前端ajax请求每次带上token进行验证
 * 4、token验证匹配，直接登录
 * 5、否则重新登录验证
 */
router.post('/login', function(req, res, next) {

    var _username = req.body.username;
    var _password = req.body.password

    // 获取前端传过来的token
    var getToken = (req.body && req.body.access_token) 
    || (req.query && req.query.access_token) 
    || req.headers['x-access-token'];

    if (getToken) {
        res.json({ 
            mssages: 'success',
            user: _username,
            pass: _password,
            token: getToken
        });
    }
    // 登录账户验证(模拟)
    else if( _username == 'admin' && _password == 'admin' ) {

        //生成token
        var _token = jwt.sign({ username: _username }, config.secret);

        //返回api结果
        res.json({ 
            user: _username,
            pass: _password,
            token: _token
        });

    } else {
        res.json({ 
            mssages: '用户名或密码错误!'
        });
    }
    
});