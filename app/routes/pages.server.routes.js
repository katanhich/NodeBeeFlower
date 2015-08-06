'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var pages = require('../../app/controllers/pages.server.controller');

	app.get('/pages/:link', pages.findByLink);

	app.all('/admin/pages*', users.requireAdmin);

	// pages Routes
	app.route('/admin/pages')
		.get(pages.list)
		.post(pages.create);

	app.route('/admin/pages/:pageId')
		.get(pages.read)
		.put(pages.update)
		.delete(pages.delete);

	// Finish by binding the pages middleware
	app.param('pageId', pages.pageByID);
};
