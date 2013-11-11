var url = require('url'),
    qs = require('qs');

var routes = {}

routes.crossdomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method == 'OPTIONS') return res.end();
  next();
}

routes.statusCode = function(req, res){
  var code = req.params[0];
  res.writeHead(code);
  res.end();
};

routes.redirect = function(req, res) {
  var route = req.params[1];

  var fn = function(data) {
    var redirect = data.redirect || '/';
    if (!redirect.match(/https?:\/\//)) {
      redirect = (redirect[0] == '/') ? redirect : '/' + redirect;
      redirect = 'http://' + req.headers.host + redirect;
    }
    res.writeHead(302, {
      'Location' : redirect
    });
    res.end();
  }
  if (route) {
    fn({redirect: route})
  } else {
    parseData(req, fn)
  }
}

routes.wait = function(req, res) {
  var wait = req.params.time;
  setTimeout(function() {
    routes.response(req, res);
  }, wait);
}

routes.response = function(req, res) {
  parseData(req, function(data) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    var responseBody = data.response || data;
    res.write(JSON.stringify(responseBody));
    res.end();
  });
}

function parseData(req, fn) {
  var queryData = ''
  if (req.method == 'GET') {
    queryData = qs.parse(url.parse(req.url).query);
    fn(queryData);
  } else {
    req.on('data', function(data) {
      queryData += data;
    })
    req.on('end', function() {
      queryData = qs.parse(queryData);
      fn(queryData);
    })
  }
}

module.exports = routes;
