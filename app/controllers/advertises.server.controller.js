'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Advertise = mongoose.model('Advertise'),
	_ = require('lodash');

/**
 * Create a Advertise
 */
exports.create = function(req, res) {
	req.body.image = req.files.file.name;
	var advertise = new Advertise(req.body);

	advertise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advertise);
		}
	});
};

/**
 * Show the current Advertise
 */
exports.read = function(req, res) {
	res.jsonp(req.advertise);
};

/**
 * Update a Advertise
 */
exports.update = function(req, res) {
	if (req.files.file) {
		req.body.image = req.files.file.name;
	}

	var advertise = req.advertise ;
	advertise = _.extend(advertise , req.body);

	advertise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advertise);
		}
	});
};

/**
 * Delete an Advertise
 */
exports.delete = function(req, res) {
	var advertise = req.advertise ;

	advertise.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advertise);
		}
	});
};

/**
 * List of Advertises
 */
exports.list = function(req, res) { 
	Advertise.find().sort('type position').exec(function(err, advertises) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(advertises);
		}
	});
};

/**
 * Advertise middleware
 */
exports.advertiseByID = function(req, res, next, id) { 
	Advertise.findById(id).exec(function(err, advertise) {
		if (err) return next(err);
		if (! advertise) return next(new Error('Failed to load Advertise ' + id));
		req.advertise = advertise ;
		next();
	});
};

exports.findByType = function(req, res) {
	var type = req.query.type;
	Advertise.find({type: type}, function(err, types) {
		if (err) {
			errorHandler.sendError()
		} else {
			res.json(types);
		}
	})
}