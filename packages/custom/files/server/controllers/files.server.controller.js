'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    FileDH = mongoose.model('FileDH'),
    multer = require('multer'),
        _ = require('lodash');


module.exports = function(FileDHs) {

    return {
        /**
         * Find filedh by id
         */
        filedh: function(req, res, next, id) {
            FileDH.load(id, function(err, filedh) {
                if (err) return next(err);
                if (!filedh) return next(new Error('Neuspesno citanje fajla: ' + id));
                req.filedh = filedh;
                next();
            });
        },

        /**
         * Create an filedh
         */
        create: function(req, res) {
            var filedh = new FileDH(req.body);
            console.log(filedh);
            filedh.save(function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Ne moze da sacuva fajl'
                    });
                }

                res.json(filedh);
            });
        },
    
        /**
         * Update an filedh
         */
        update: function(req, res) {
            var filedh = req.filedh;

            filedh = _.extend(filedh, req.body);


            filedh.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da sacuva fajl'
                    });
                }

                res.json(filedh);
            });
        },
        /**
         * Delete an filedh
         */
        destroy: function(req, res) {
            var filedh = req.filedh;


            filedh.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da obrise fajl'
                    });
                }

                res.json(filedh);
            });
        },
        /**
         * Show an filedh
         */
        show: function(req, res) {

            res.json(req.filedh);
        },
        /**
         * List of filedh
         */
        all: function(req, res) {
            FileDH.find({}, function(err, data) {
                if (err) {
                    return res.status(500).json({
                        error: 'Ne moze da izlista file'
                    });
                }

                res.json(data)
            });

        },
  
        fileUpload: function(req, res) {
            var file = req.files.file,
                fs = require('fs'),
                path = './uploads/';
        
            // Logic for handling missing file, wrong mimetype, no buffer, etc.
            var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
                fileName = file.name;
            var stream = fs.createWriteStream(path + fileName);
            stream.write(buffer);
            stream.on('error', function(err) {
                console.log('Could not write file to memory.');
                res.status(400).send({
                    message: 'Problem saving the file. Please try again.'
                });
            });
            stream.on('finish', function() {

                var filedh = new FileDH();
                filedh.fieldname = file.fieldname;     
                filedh.originalname = file.originalname;
                filedh.name = file.name;
                filedh.encoding = file.encoding;
                filedh.mimetype = file.mimetype;
                filedh.path = file.path;
                filedh.extension = file.extension;
                filedh.size = file.size;
               // filedh.userDocument.truncated = file.truncated;
              //  filedh.userDocument.buffer = file.buffer;
                
                console.log(filedh);

                filedh.save(function(err) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: 'Ne moze da sacuva fajl'
                        });
                    }
    
                  //res.json(filedh);
                });
                
                
                var data = {
                    message: 'File saved successfully.'
                };
                res.jsonp(data);
            });
            stream.end();
            console.log('Stream ended.');
        }
    };
}
