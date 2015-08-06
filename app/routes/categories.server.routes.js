'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var categories = require('../../app/controllers/categories.server.controller');

	app.all('/admin/categories*', users.requireAdmin);

	// Categories Routes
	app.route('/admin/categories')
		.get(categories.listForAdmin)
		.post(categories.create);

	app.route('/admin/categories/:categoryId')
		.get(categories.read)
		.put(categories.update)
		.delete(categories.delete);

	// Finish by binding the Category middleware
	app.param('categoryId', categories.categoryByID);
};
