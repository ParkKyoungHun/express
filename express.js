//해당 폴더에 설치 되어 있는 express모듈을 가져옴.
const express = require('express');
//body파서 모듈
const bodyParser = require('body-parser');
//mysql 모듈
const mysql = require('mysql');
//dbconfig
const dbconfig   = require('./dbconfig.js');
const port = 80;

var connection = mysql.createConnection(dbconfig);

console.log('Server openning');

var expApp = express();
expApp.set("port",port);
expApp.use(bodyParser.urlencoded({ extended: false }));
expApp.use(bodyParser.json())
//serverFunc 정의
//req : 요청, res : 응답
var serverFunc = function(req, res){
    console.log("req.param : " + req.params.a);
    console.log("req.body : " + req.body);
    console.dir(req.body);
    console.log("req.query : " + req.query.a);
    res.send('Hello Express');
}
var serverFunc2 = function(req, res){
    console.log("req.param : " + req.params.id);
    console.log("req.body : " + req.body);
    console.log("req.query : " + req.query);
    res.send('Hello Express2');
}

var serverFunc3 = function(req,res){
    console.log("req.param : " + req.params.id);
    console.log("req.body : " + req.body.red);
    console.dir(req.body);
    console.log("req.query : " + req.query);
    res.send('Hello Express3');
}
//기본 url(rootpath) 접속 시 serverFunc의 응답객체에서 문자열을 전송
expApp.get('/', serverFunc);
expApp.post('/', serverFunc);
expApp.get('/user/:id',serverFunc2);
expApp.post('/test/',serverFunc3);

expApp.get('/user', function(req, res){
connection.query('SELECT * from user_info', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});


//80포트로 시작
expApp.listen(expApp.get('port'), function () {
  console.log('Express server listening on port ' + expApp.get('port'));
});