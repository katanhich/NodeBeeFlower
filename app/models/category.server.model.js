'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Common = require('../utils/common.server.util');

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		required: 'Please fill Category name',
		trim: true
	},
	uname: String,
	position: {
		type: Number,
		required: 'Please fill position'
	},
	type: {
		type: Schema.ObjectId,
		ref: 'Typecategory',
		required: 'Please fill type category'
	}
});

CategorySchema.pre('save', function(next) {
	this.uname = Common.removeVietnamese(this.name);
	next();
});

CategorySchema.statics.findByType = function(type, callback) {
	this.find({type: type}).sort('position').exec(callback);
}

mongoose.model('Category', CategorySchema);
