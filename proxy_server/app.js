var express = require('express');
var request = require('request');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/proxy_backend_api', function(req, res) {
  var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  var options = {
    url : req.body.url,
    method :'POST',
    headers : headers,
    form : req.body.params
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      var result = {
        res : 0,
        body : body
      }
      res.send(result);
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
