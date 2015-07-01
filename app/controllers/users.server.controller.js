/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var User = require('mongoose').model('User'),
    errorHandler = require('./errors.server.controller');

module.exports.create = function(req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.save(function(err) {
        if (err) {
            return errorHandler.sendError(err, res);
        }
        res.json(newUser);
    })
}

module.exports.renderAdminLogin = function(req, res) {
    res.render('admin/login');
};

module.exports.adminLogout = function(req, res){
    req.logout();
    res.redirect('/admin/login');
};

module.exports.requireAdmin = function(req, res, callback) {
    if (req.isAuthenticated()) {
        var user = req.user;
        if (user.roles.indexOf('admin') >= 0) {
            return callback();
        }
    }
    res.redirect('/admin/login');
}