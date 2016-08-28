var express = require('express'),
    app = express(),
    handlebars = require('express-handlebars')
    .create({ defaultLayout : 'main' });
    // require('express-handlebars').({ extname : '.hbs' }) // 확장자 변경가능

var ms = require('./app/random_message.js');
// var appConfig = {
//     port : 3000,
//     staticPath : 'static',
//     controller : {
//         main : '/',
//         page : '/page',
//         list : '/list',
//         detail : '/detail'
//     }
// };

app
    // 핸들바 엔진 미들웨어 등록
    .engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars')
    // 서버 측 템플릿 사용시 캐싱가능 개발모드 false, 릴리즈 true
    // .set('view cache', true) // 서버측 뷰 캐싱 활성화 강제
    // static resource serving 미들웨어 등록
    .use(express.static(__dirname + '/static'))
    // form, ajax 데이터 본문 파싱을 위한 body-parser 등록
    .use(require('body-parser').urlencoded({ extended : true }))
    .listen(3000, function(){
        console.log('connected port 3000');
    });

// 리퀘스트 맵핑
app
    // main
    .get('/', function(req, res){
        var viewModel = {
            title : 'SUPERJANG!!',
            timestamp : new Date(),
            randomMsg : ms.getRandomMsg(),
            layout : 'search' // 뷰 컨텍스트에 layout 값으로 레이아웃 템플릿 선언 -> views/layout/search.handlebars
        };
        res.render('home', viewModel);
    })
    .get('/form', function(req, res){
        var viewModel = {
            requestAPI : '/process',
            csrf : 'blabla security code'
        };
        res.render('form', viewModel);
    })
    .post('/process', function(req, res){
        // req.query 쿼리
        // req.body 본문
        console.log(req.query);
        console.log(req.body._csrf);
        console.log(req.body.nameField);
        console.log(req.body.emailField);
        res.redirect(303, '/'); // status, URI path
    })
    .post('/ajax', function(req, res){
        if(req.xhr || req.accepts('json, html') === 'json'){
            console.log('data',req.body);
            res.send({success:true});
        }else{
            res.send({error:'ERRor!!!'});
        }
    })
    // 404 핸들러 미들웨어 등록
    .use(function(req, res, next){
        res
            .status(404)
            .render('error/404');
    })
    // 500 핸들러 미들웨어 등록
    .use(function(err, req, res, next){
        res
            .status(500)
            .render('error/500');
    });
