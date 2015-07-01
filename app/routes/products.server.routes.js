'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');
	var multer  = require('multer');

	app.all('/admin/products/*', users.requireAdmin);

	// Products Routes
	app.route('/admin/products')
		.get(products.list)
		.post(multer({ dest: 'public/images',
			rename: function (fieldname, filename) {
				return filename.toLowerCase() + Date.now();
			}
		}),products.create);

	app.route('/admin/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);
};
