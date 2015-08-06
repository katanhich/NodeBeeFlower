'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Typecategory = mongoose.model('Typecategory'),
	Category = mongoose.model('Category'),
	async = require('async'),
	_ = require('lodash');

/**
 * Create a Typecategory
 */
exports.create = function(req, res) {
	var typecategory = new Typecategory(req.body);

	typecategory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typecategory);
		}
	});
};

/**
 * Show the current Typecategory
 */
exports.read = function(req, res) {
	res.jsonp(req.typecategory);
};

/**
 * Update a Typecategory
 */
exports.update = function(req, res) {
	var typecategory = req.typecategory ;

	typecategory = _.extend(typecategory , req.body);

	typecategory.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typecategory);
		}
	});
};

/**
 * Delete an Typecategory
 */
exports.delete = function(req, res) {
	var typecategory = req.typecategory ;

	typecategory.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typecategory);
		}
	});
};

/**
 * List of Typecategories
 */
exports.list = function(req, res) { 
	Typecategory.find().sort('position').exec(function(err, typecategories) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(typecategories);
		}
	});
};

/**
 * Typecategory middleware
 */
exports.typecategoryByID = function(req, res, next, id) { 
	Typecategory.findById(id).exec(function(err, typecategory) {
		if (err) return next(err);
		if (! typecategory) return next(new Error('Failed to load Typecategory ' + id));
		req.typecategory = typecategory ;
		next();
	});
};

exports.findAllAndCategories = function(req, res) {
	Typecategory.find().sort('position').exec(function(err, types) {
		var result = convertListToObject(types);
		async.each(result, function(type, callback) {
			Category.findByType(type._id, function(err, categories){
				type.categories = categories;
				callback();
			})
		}, function(err) {
			if (err) {
				console.log(err.stack);
			}
			res.json(result);
		})
	})
};

function convertListToObject(objects) {
	var result = [];
	objects.forEach(function(object) {
		result.push(object.toObject());
	});
	return result;
}