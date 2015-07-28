
'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(FileDHs, app, auth, database) {
  var filedhs = require('../controllers/files.server.controller')(FileDHs);
  var multer = require('multer'),
      express = require('express');
  var done = false;
  /*
  app.use(multer({
    dest: '../../public/uploads/',
    limits: {
        fieldNameSize: 50,
        files: 1,
        fields: 5,
        fileSize: 50 * 1024 * 1024
    },
    rename: function(fieldname, filename) {
        return filename;
    },
    onFileUploadStart: function(file) {
        console.log('Starting file upload process.');
        console.log(file.originalname + ' is starting ...');
        if(file.mimetype !== 'application/pdf') {
            return false;
        }
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done=true;
    },
    inMemory: true //This is important. It's what populates the buffer.
  }));
  var stringToSend = "";
  
  stringToSend += "<form method='post'><input type='file' name='file'><input type='submit' value='Upload'></form>";
  app.get('/api/files', function(req, res){
    res.send(stringToSend);
  });
  
  app.post('/api/files',[ multer({ dest: './uploads/'}), function(req, res){
      console.log(req.body) // form fields
      console.log(req.body.file)
      console.log(req.files) // form files
      filedhs.fileUpload
      if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
      }
      res.status(204).end()
  }]);
  */
  /*
  app.route('/api/files')
    .get(filedhs.all)
    .post(filedhs.create);
  app.route('/api/files/:fileID')
    .get(filedhs.show)
    .put(filedhs.update)
    .delete(filedhs.destroy);
  */
  
  var stringToGet = "<html> <body> <form action='/api/files' method='post' enctype='multipart/form-data'> <input type='file' name ='file' accept='application/pdf'> <input type='submit' value='Upload selected file to server'> </form> </body> </html>";
  app.use(multer( {
            dest:'./uploads/',
            limits: {
              fieldNameSize: 50,
              files: 1,
              fields: 5,
              fileSize: 50 * 1024 * 1024
            },
            onFileUploadStart : function(file){
                console.log('File recieved:');
                console.log(file);
            },
             onFileUploadData:function (file,data){
                console.log('Data recieved');
            },
             onParseEnd: function(req,next){
                next();
             },
             inMemory: true //This is important. It's what populates the buffer.
            }));

  app.use(express.static("./uploads"));
  app.get('/api/files', function(req, res){
    res.send(stringToGet);
  }/*filedhs.all*/);
  app.post('/api/files',filedhs.fileUpload);
  app.route('/api/files/json')
    .get(filedhs.all)
    .post(filedhs.create);
  app.route('/api/files/:fileID')
    .get(filedhs.show)
    .put(filedhs.update)
    .delete(filedhs.destroy);
  
  // Finish with setting up the documentId param
  app.param('fileID', filedhs.filedh);
};