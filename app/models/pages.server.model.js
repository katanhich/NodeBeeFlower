/**
 * Created by Cao Hong Phuoc on 7/15/2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pages Schema
 */
var PagesSchema = new Schema({
	link: {
		type: String,
		required: 'Please fill link',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	detail: String
});

mongoose.model('Page', PagesSchema);