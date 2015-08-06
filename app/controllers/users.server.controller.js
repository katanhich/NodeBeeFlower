/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var User = require('mongoose').model('User'),
    errorHandler = require('./errors.server.controller');

var _this = this;

function checkAjax(req) {
    return req.xhr || req.headers.accept.indexOf('json') > -1;
};

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

module.exports.requireLogin = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    if (checkAjax(req)) {
        res.status(401).json({
            message: 'User is not logged in'
        });
    } else {
        res.redirect('/admin/login');
    }
};

module.exports.requireAdmin = function(req, res, callback) {
    _this.requireLogin(req, res, function() {
        var user = req.user;
        if (user.roles.indexOf('admin') >= 0) {
            return callback();
        }

        if (checkAjax(req)) {
            res.status(403).json({
                message: 'User is not authorized'
            });
        } else {
            res.redirect('/admin/login');
        }
    });
};