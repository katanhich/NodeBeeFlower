'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var products = require('../../app/controllers/products.server.controller');
	var multer  = require('multer');

	app.get('/products/category/:uname', products.findByCategory);

	app.post('/products/find_ordered_products', products.findOrderedProducts);

	app.get('/products/home', products.findForHome);
	app.get('/products/find_related', products.findRelatedProduct);
	app.get('/products/:productId', products.read);

	app.all('/admin/products*', users.requireAdmin);

	// Products Routes
	app.route('/admin/products')
		.get(products.list)
		.post(products.create);

	app.route('/admin/products/:productId')
		.get(products.read)
		.put(products.update)
		.delete(products.delete);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);
};
