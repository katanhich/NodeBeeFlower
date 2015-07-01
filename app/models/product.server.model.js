'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill Product name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	description: String,
	detail: String,
	thumbnail: String,
	price: Number,
	deal_price: Number,
	show_home: {
		type: Boolean,
		default: false
	},
	ready: {
		type: Boolean,
		default: false
	},
	categories: [{
		type: Schema.ObjectId,
		ref: 'Category'
	}],
	hot: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Product', ProductSchema);
