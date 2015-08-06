'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var news = require('../../app/controllers/news.server.controller');

	app.get('/news/home', news.findFiveNewest);
	app.get('/news/:uname', news.findByUname);
	app.get('/news', news.findReadyNews);

	app.all('/admin/news*', users.requireAdmin);

	// News Routes
	app.route('/admin/news')
		.get(news.list)
		.post(news.create);

	app.route('/admin/news/:newsId')
		.get(news.read)
		.put(news.update)
		.delete(news.delete);

	// Finish by binding the News middleware
	app.param('newsId', news.newsByID);
};
