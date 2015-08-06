/**
 * Created by Cao Hong Phuoc on 7/15/2015.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Common = require('../utils/common.server.util'),
	Define = require('../constant/define');

/**
 * News Schema
 */
var NewsSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill name',
		trim: true
	},
	uname: String,
	created: {
		type: Date,
		default: Date.now
	},
	description: String,
	detail: String,
	image: String,
	ready: Boolean
});

NewsSchema.pre('save', function(next) {
	this.uname = Common.removeVietnamese(this.name);
	next();
});

NewsSchema.statics.findReadyNews = function(page, next) {
	this.find({ready: true}).skip(page * Define.pageSize).limit(Define.pageSize).exec(next);
};

mongoose.model('News', NewsSchema);