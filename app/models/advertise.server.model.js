'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advertise Schema
 */
var AdvertiseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Advertise name',
		trim: true
	},
	image: {
		type: String,
		required: 'Please choose an image for this ad'
	},
	width: {
		type: Number,
		required: 'Please fill width for this ad'
	},
	height: {
		type: Number,
		required: 'Please fill height for this ad'
	},
	created: {
		type: Date,
		default: Date.now
	},
	website: {
		type: String
	},
	type: Number,
	position: Number
});

AdvertiseSchema.statics.findByType = function(type, callback) {
	this.find({type: type}, callback);
}

mongoose.model('Advertise', AdvertiseSchema);