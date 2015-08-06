'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var typecategories = require('../../app/controllers/typecategories.server.controller');

	app.get('/findTypesAndCategories', typecategories.findAllAndCategories);

	app.all('/admin/typecategories*', users.requireAdmin);

	// Typecategories Routes
	app.route('/admin/typecategories')
		.get(typecategories.list)
		.post(typecategories.create);

	app.route('/admin/typecategories/:typecategoryId')
		.get(typecategories.read)
		.put(typecategories.update)
		.delete(typecategories.delete);

	// Finish by binding the Typecategory middleware
	app.param('typecategoryId', typecategories.typecategoryByID);
};
