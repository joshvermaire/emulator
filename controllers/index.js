'use strict';

var rSTATUS = /10[012]|20[0-8]|226|30[0-8]|4[01][\d]|42[02-689]|431|44[49]|45[01]|49[4-79]|50[\d]|51[01]|522|59[89]/;


module.exports = function (app) {

    app.param('status', rSTATUS);

    app.all('/redirect/:redirect?', redirect);
    app.all('/wait/:time', wait);
    app.all('/:status', statusCode);
    app.all('/*', response);


};

function statusCode(req, res) {

  var status = parseInt(req.params.status, 10);
  res.send(status);
}

function redirect(req, res) {

  var route = req.params.redirect;

  var fn = function(data) {

    var redirect = data.redirect || '/';
    if (!redirect.match(/https?:\/\//)) {
      redirect = (redirect[0] == '/') ? redirect : '/' + redirect;
    }
    res.redirect(redirect);
  }

  if (route) {
    fn({ redirect: route });
  } else {
    parseData(req, fn);
  }
}

function wait(req, res) {

  var wait = req.params.time;
  setTimeout(function(req, resp) {
    response(req, resp);
  }, wait, req, res);
}

function response(req, res) {

  parseData(req, function(data) {

    res.send(200, data.response || data);
  });
}

function parseData(req, fn) {

  var data = (req.method === 'GET') ? req.query : req.body;
  fn(data);
}
