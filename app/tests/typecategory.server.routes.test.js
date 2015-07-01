'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Typecategory = mongoose.model('Typecategory'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, typecategory;

/**
 * Typecategory routes tests
 */
describe('Typecategory CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Typecategory
		user.save(function() {
			typecategory = {
				name: 'Typecategory Name'
			};

			done();
		});
	});

	it('should be able to save Typecategory instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typecategory
				agent.post('/typecategories')
					.send(typecategory)
					.expect(200)
					.end(function(typecategorySaveErr, typecategorySaveRes) {
						// Handle Typecategory save error
						if (typecategorySaveErr) done(typecategorySaveErr);

						// Get a list of Typecategories
						agent.get('/typecategories')
							.end(function(typecategoriesGetErr, typecategoriesGetRes) {
								// Handle Typecategory save error
								if (typecategoriesGetErr) done(typecategoriesGetErr);

								// Get Typecategories list
								var typecategories = typecategoriesGetRes.body;

								// Set assertions
								(typecategories[0].user._id).should.equal(userId);
								(typecategories[0].name).should.match('Typecategory Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Typecategory instance if not logged in', function(done) {
		agent.post('/typecategories')
			.send(typecategory)
			.expect(401)
			.end(function(typecategorySaveErr, typecategorySaveRes) {
				// Call the assertion callback
				done(typecategorySaveErr);
			});
	});

	it('should not be able to save Typecategory instance if no name is provided', function(done) {
		// Invalidate name field
		typecategory.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typecategory
				agent.post('/typecategories')
					.send(typecategory)
					.expect(400)
					.end(function(typecategorySaveErr, typecategorySaveRes) {
						// Set message assertion
						(typecategorySaveRes.body.message).should.match('Please fill Typecategory name');
						
						// Handle Typecategory save error
						done(typecategorySaveErr);
					});
			});
	});

	it('should be able to update Typecategory instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typecategory
				agent.post('/typecategories')
					.send(typecategory)
					.expect(200)
					.end(function(typecategorySaveErr, typecategorySaveRes) {
						// Handle Typecategory save error
						if (typecategorySaveErr) done(typecategorySaveErr);

						// Update Typecategory name
						typecategory.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Typecategory
						agent.put('/typecategories/' + typecategorySaveRes.body._id)
							.send(typecategory)
							.expect(200)
							.end(function(typecategoryUpdateErr, typecategoryUpdateRes) {
								// Handle Typecategory update error
								if (typecategoryUpdateErr) done(typecategoryUpdateErr);

								// Set assertions
								(typecategoryUpdateRes.body._id).should.equal(typecategorySaveRes.body._id);
								(typecategoryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Typecategories if not signed in', function(done) {
		// Create new Typecategory model instance
		var typecategoryObj = new Typecategory(typecategory);

		// Save the Typecategory
		typecategoryObj.save(function() {
			// Request Typecategories
			request(app).get('/typecategories')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Typecategory if not signed in', function(done) {
		// Create new Typecategory model instance
		var typecategoryObj = new Typecategory(typecategory);

		// Save the Typecategory
		typecategoryObj.save(function() {
			request(app).get('/typecategories/' + typecategoryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', typecategory.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Typecategory instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Typecategory
				agent.post('/typecategories')
					.send(typecategory)
					.expect(200)
					.end(function(typecategorySaveErr, typecategorySaveRes) {
						// Handle Typecategory save error
						if (typecategorySaveErr) done(typecategorySaveErr);

						// Delete existing Typecategory
						agent.delete('/typecategories/' + typecategorySaveRes.body._id)
							.send(typecategory)
							.expect(200)
							.end(function(typecategoryDeleteErr, typecategoryDeleteRes) {
								// Handle Typecategory error error
								if (typecategoryDeleteErr) done(typecategoryDeleteErr);

								// Set assertions
								(typecategoryDeleteRes.body._id).should.equal(typecategorySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Typecategory instance if not signed in', function(done) {
		// Set Typecategory user 
		typecategory.user = user;

		// Create new Typecategory model instance
		var typecategoryObj = new Typecategory(typecategory);

		// Save the Typecategory
		typecategoryObj.save(function() {
			// Try deleting Typecategory
			request(app).delete('/typecategories/' + typecategoryObj._id)
			.expect(401)
			.end(function(typecategoryDeleteErr, typecategoryDeleteRes) {
				// Set message assertion
				(typecategoryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Typecategory error error
				done(typecategoryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Typecategory.remove().exec();
		done();
	});
});