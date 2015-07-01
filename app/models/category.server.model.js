'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		required: 'Please fill Category name',
		trim: true
	},
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

mongoose.model('Category', CategorySchema);
