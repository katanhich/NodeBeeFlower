/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var config = require('./config'),
    path = require('path'),
    mongoose = require('mongoose');

module.exports = function() {
    // Bootstrap db connection
    mongoose.connect(config.db, function(err) {
        if (err) {
            console.error('Could not connect to MongoDB!');
        } else {
            console.log('Connected to MongoDB');
        }
    });

    // Globbing model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });
}
