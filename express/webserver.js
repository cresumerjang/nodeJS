var express = require('express'),
    app = express();

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
    // 스태틱 리소스 root dir 지정
    .use(express.static('statice'))
    .listen(3000, function(){
        console.log('connected port 3000');
    });

// 리퀘스트 맵핑
app
    // main
    .get('/', function(req, res){
        res.send('200');
    });
