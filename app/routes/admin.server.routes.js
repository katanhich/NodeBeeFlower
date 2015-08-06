/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

var user = require('../controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.post('/users', user.create);

    app.get('/admin/login', user.renderAdminLogin);
    app.post('/admin/login', passport.authenticate('local', {
        failureRedirect: '/admin/login',
        successRedirect: '/admin'
    }));

    app.get('/admin/logout', user.adminLogout);

    app.get('/admin', user.requireAdmin, function(req, res) {
        res.render('admin/index', {
            user: req.user
        });
    });

    app.use('/admin/upload', function(req, res) {
        var funcNum = req.query.CKEditorFuncNum;
        var url = '/images/' + req.files.upload.name;
        var message = 'Upload success';
        var params = funcNum + ',\'' + url + '\',\'' +  message + '\'';
        // after upload success, CKEDITOR will call this script
        res.send('<script type=\'text/javascript\'>window.parent.CKEDITOR.tools.callFunction(' + params + ');</script>');
    })
}
