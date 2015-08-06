'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	News = mongoose.model('News'),
	_ = require('lodash');

/**
 * Create a News
 */
exports.create = function(req, res) {
	req.body.image = req.files.file.name;
	var news = new News(req.body);

	news.save(function(err) {
		if (err) {
			errorHandler.sendError(err, res);
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * Show the current News
 */
exports.read = function(req, res) {
	res.jsonp(req.news);
};

/**
 * Update a News
 */
exports.update = function(req, res) {
	if (req.files.file) {
		req.body.image = req.files.file.name;
	}

	var news = req.news ;
	news = _.extend(news , req.body);

	news.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.sendError(err, res)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * Delete an News
 */
exports.delete = function(req, res) {
	var news = req.news ;

	news.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * List of News
 */
exports.list = function(req, res) { 
	News.find().sort('-ready -created').exec(function(err, news) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(news);
		}
	});
};

/**
 * News middleware
 */
exports.newsByID = function(req, res, next, id) { 
	News.findById(id).exec(function(err, news) {
		if (err) return next(err);
		if (! news) return next(new Error('Failed to load News ' + id));
		req.news = news ;
		next();
	});
};

exports.findFiveNewest = function(req, res) {
	News.find().sort('-created').limit(5).exec(function(err, lnews) {
		if (err) {
			return errorHandler.sendError(err, res);
		}

		res.json(lnews);
	})
};

exports.findByUname = function(req, res) {
	News.findOne({uname: req.params.uname}, function(err, news) {
		if (err) {
			errorHandler.sendError(err, res);
		} else {
			res.json(news);
		}
	})	
};

exports.findReadyNews = function(req, res) {
	var page = req.query.page - 1;
	News.findReadyNews(page, function(err, lnews) {
		if (err) {
			errorHandler.sendError(err, res);
		} else {
			res.json(lnews);
		}
	});
};
