'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var advertises = require('../../app/controllers/advertises.server.controller');

	app.get('/findAdvertiseByType', advertises.findByType);

	app.all('/admin/advertises*', users.requireAdmin);

	// Advertises Routes
	app.route('/admin/advertises')
		.get(advertises.list)
		.post(advertises.create);

	app.route('/admin/advertises/:advertiseId')
		.get(advertises.read)
		.put(advertises.update)
		.delete(advertises.delete);

	// Finish by binding the Advertise middleware
	app.param('advertiseId', advertises.advertiseByID);
};
