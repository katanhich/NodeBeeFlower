'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Order = mongoose.model('Order'),
	_ = require('lodash');

exports.create = function(req, res) {
	var order = new Order(req.body);
	order.status = 'pending';

	order.save(function(err, newOrder) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp({id: newOrder._id});
		}
	});
};

/**
 * Show the current Advertise
 */
exports.read = function(req, res) {
	res.jsonp(req.cart);
};

/**
 * Update a Advertise
 */
exports.update = function(req, res) {
	var cart = req.cart ;
	cart = _.extend(cart , req.body);

	cart.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp({});
		}
	});
};

/**
 * Delete an Advertise
 */
exports.delete = function(req, res) {
	var cart = req.cart ;

	cart.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp({});
		}
	});
};

exports.list = function(req, res) { 
	Order.find({}, 'status created').sort('-created').exec(function(err, carts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(carts);
		}
	});
};

exports.cartByID = function(req, res, next, id) { 
	Order.findById(id).exec(function(err, order) {
		if (err) return next(err);
		if (!order) return next(new Error('Failed to load Order ' + id));
		req.cart = order;
		next();
	});
};