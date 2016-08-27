var express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({ defaultLayout : 'main' });

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
    // static resource serving 미들웨어 등록
    .use(express.static(__dirname + '/static'))
    .listen(3000, function(){
        console.log('connected port 3000');
    });

// 리퀘스트 맵핑
app
    // main
    .get('/', function(req, res){
        var viewModel = {
            title : 'SUPERJANG!!',
            timestamp : new Date()
        };
        res.render('home', viewModel);
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
