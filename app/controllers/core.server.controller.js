'use strict';

var Advertise = require('mongoose').model('Advertise');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	Advertise.findByType(1, function(err, advertises) {
		res.render('index', {
			user: req.user || null,
			request: req,
			mainAdvertise: advertises[0]
		});
	})
};