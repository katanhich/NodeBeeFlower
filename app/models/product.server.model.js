'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Define = require('../constant/define');

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

ProductSchema.statics.homePagination = function(page, callback) {
	this.find({show_home: true}).skip(page * Define.pageSize).limit(Define.pageSize).exec(callback);
};

ProductSchema.statics.findRelatedProduct = function(productId, categoryId, cb) {
	this.find({categories: categoryId, _id: {$ne: productId}}).limit(7).exec(cb);
}

ProductSchema.statics.findByCategory = function(categoryId, page, cb) {
	this.find({categories: categoryId}).skip(page * Define.pageSize).limit(Define.pageSize).exec(cb);
}

ProductSchema.statics.findOrderedProducts = function(ids, next) {
	this.find({_id: {$in: ids}}, 'name price deal_price', next);
};

mongoose.model('Product', ProductSchema);
