var express = require('express'),
    app = express();

app.listen(3000, function(){
    console.log('connected port 3000');
    console.log(__dirname);
});
