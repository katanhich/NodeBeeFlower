'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Page = mongoose.model('Page'),
	_ = require('lodash');

/**
 * Create a Pages
 */
exports.create = function(req, res) {
	var page = new Page(req.body);

	page.save(function(err) {
		if (err) {
			errorHandler.sendError(err, res);
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * Show the current Pages
 */
exports.read = function(req, res) {
	res.jsonp(req.page);
};

/**
 * Update a Pages
 */
exports.update = function(req, res) {
	var page = req.page;
	page = _.extend(page , req.body);

	page.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.sendError(err, res)
			});
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * Delete an Pages
 */
exports.delete = function(req, res) {
	var page = req.page;

	page.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(page);
		}
	});
};

/**
 * List of Pages
 */
exports.list = function(req, res) { 
	Page.find().sort('-created').exec(function(err, pages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(pages);
		}
	});
};

/**
 * Pages middleware
 */
exports.pageByID = function(req, res, next, id) { 
	Page.findById(id).exec(function(err, page) {
		if (err) return next(err);
		if (!page) return next(new Error('Failed to load Pages ' + id));
		req.page = page ;
		next();
	});
};

exports.findByLink = function(req, res) {
	Page.findOne({link: req.params.link}, function(err, page) {
		if (err) {
			errorHandler.sendError(err, res);
		} else {
			res.json(page);
		}
	})	
};
