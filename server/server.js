var loopback = require('loopback');
var boot = require('loopback-boot');
var formidable = require("formidable");
var fs =require('fs');

var app = module.exports = loopback();

app.use("/api/Journalisms/uploaderImage",function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "client/img/";
    form.parse(req, function(error, fields, files) {
        fs.renameSync(files.upload.path, form.uploadDir + files.upload.name);
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.write("{\"url\":\"http://127.0.0.1:3000/img/"+files.upload.name+"\"}");
        res.end();
  });
});
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
