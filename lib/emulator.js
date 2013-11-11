var http   = require('http'),
    router = require('router')()
    routes = require('./routes');

module.exports = function(config) {
  config || (config = {});
  var port = config.port || 3000;

  router.get('/favicon.icon', function(req, res) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
  });

  if (!config.cors)     router.all('*', routes.crossdomain);
  if (!config.redirect) router.all(/^\/redirect\/*(\S+)*/, routes.redirect);
  if (!config.wait)     router.all('/wait/{time}', routes.wait);
  if (!config.status)   router.all(/10[012]|20[0-8]|226|30[0-8]|4[01][\d]|42[02-689]|431|44[49]|45[01]|49[4-79]|50[\d]|51[01]|522|59[89]/, routes.statusCode);

  router.all('*', routes.response);

  http.createServer(router).listen(port, function() {
    console.log('Emulator running on port '+ port);
  });
}

