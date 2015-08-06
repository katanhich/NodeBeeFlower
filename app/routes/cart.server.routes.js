'use strict';

var carts = require('../../app/controllers/cart.server.controller');

module.exports = function(app) {

	app.get('/cart', carts.list);
	
	app.post('/cart/order', carts.create);

	app.get('/cart/:cartId', carts.read);

	app.param('cartId', carts.cartByID);
};