'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
	sender: {
		name: {
			type: String,
			trim: true
		},
		email: String,
		phone: String,
		address: String,
		note: String
	},
	receiver: {
		name: {
			type: String,
			trim: true
		},
		phone: String,
		address: String,
		message: String
	},
	status: String,
	created: {
		type: Date,
		default: Date.now
	},
	checkout: String,
	receive_date: String,
	products: [{
		_id: Schema.ObjectId,
		name: String,
		quality: Number,
		price: Number,
		deal_price: Number
	}]
});

mongoose.model('Order', OrderSchema);
