'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	_ = require('lodash'),
	fs = require('fs'),
	async = require('async');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	req.body.categories = JSON.parse(req.body.categories);
	req.body.thumbnail = req.files.file.name;

	var product = new Product(req.body);
	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * Show the current Product
 */
exports.read = function(req, res) {
	res.jsonp(req.product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
	var product = req.product ;

	product = _.extend(product , req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	});
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
	var product = req.product ;

	async.parallel([
		function(callback) {
			try {
				fs.unlinkSync('public/images/'+product.thumbnail);
			} catch (e) {
				console.log(e)
			}
			callback();
		},
		function(callback) {
			product.remove(callback);
		}
 	], function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(product);
		}
	})
};

/**
 * List of Products
 */
exports.list = function(req, res) { 
	Product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(products);
		}
	});
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) { 
	Product.findById(id).populate('categories', 'name').exec(function(err, product) {
		if (err) return next(err);
		if (! product) return next(new Error('Failed to load Product ' + id));
		req.product = product ;
		next();
	});
};

