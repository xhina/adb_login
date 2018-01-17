var express = require('express');
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var headers = {
  'User-Agent': 'Super Agent/0.0.1',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};

app.get('/', function(req, res) {
  res.send("adb proxy api server");
});

app.post('/kakao_access_token', function(req, res) {
  var params = {
    grant_type:req.body.grant_type,
    client_id:req.body.client_id,
    redirect_uri:req.body.redirect_uri,
    code:req.body.code
  };

  var options = {
    url : req.body.url,
    method :'POST',
    headers : headers,
    form : params
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      var result = {
        res : 0,
        body : body
      };
      res.send(body);
    }
    else {
      console.log("error:",error);
      console.log("body:",body);
      res.send(body);
    }
  });
});

app.post('/kakao_user_id', function(req, res) {
  var tokenHeader = {
    Authorization : 'Bearer ' + req.body.access_token
  }
  var headers = Object.assign({}, headers, tokenHeader);

  var options = {
    url : req.body.url,
    method :'POST',
    headers : headers
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    else {
      console.log("error:",error);
      console.log("body:",body);
      res.send(body);
    }
  });
});

app.listen(3001, function() {
  console.log('listening 3001 port');
});
