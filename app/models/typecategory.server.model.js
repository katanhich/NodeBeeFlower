'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Typecategory Schema
 */
var TypecategorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill name',
		trim: true
	},
	position: Number
});

mongoose.model('Typecategory', TypecategorySchema);
