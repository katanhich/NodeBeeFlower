'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Advertise = mongoose.model('Advertise'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, advertise;

/**
 * Advertise routes tests
 */
describe('Advertise CRUD tests', function() {
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

		// Save a user to the test db and create new Advertise
		user.save(function() {
			advertise = {
				name: 'Advertise Name'
			};

			done();
		});
	});

	it('should be able to save Advertise instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advertise
				agent.post('/advertises')
					.send(advertise)
					.expect(200)
					.end(function(advertiseSaveErr, advertiseSaveRes) {
						// Handle Advertise save error
						if (advertiseSaveErr) done(advertiseSaveErr);

						// Get a list of Advertises
						agent.get('/advertises')
							.end(function(advertisesGetErr, advertisesGetRes) {
								// Handle Advertise save error
								if (advertisesGetErr) done(advertisesGetErr);

								// Get Advertises list
								var advertises = advertisesGetRes.body;

								// Set assertions
								(advertises[0].user._id).should.equal(userId);
								(advertises[0].name).should.match('Advertise Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Advertise instance if not logged in', function(done) {
		agent.post('/advertises')
			.send(advertise)
			.expect(401)
			.end(function(advertiseSaveErr, advertiseSaveRes) {
				// Call the assertion callback
				done(advertiseSaveErr);
			});
	});

	it('should not be able to save Advertise instance if no name is provided', function(done) {
		// Invalidate name field
		advertise.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advertise
				agent.post('/advertises')
					.send(advertise)
					.expect(400)
					.end(function(advertiseSaveErr, advertiseSaveRes) {
						// Set message assertion
						(advertiseSaveRes.body.message).should.match('Please fill Advertise name');
						
						// Handle Advertise save error
						done(advertiseSaveErr);
					});
			});
	});

	it('should be able to update Advertise instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advertise
				agent.post('/advertises')
					.send(advertise)
					.expect(200)
					.end(function(advertiseSaveErr, advertiseSaveRes) {
						// Handle Advertise save error
						if (advertiseSaveErr) done(advertiseSaveErr);

						// Update Advertise name
						advertise.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Advertise
						agent.put('/advertises/' + advertiseSaveRes.body._id)
							.send(advertise)
							.expect(200)
							.end(function(advertiseUpdateErr, advertiseUpdateRes) {
								// Handle Advertise update error
								if (advertiseUpdateErr) done(advertiseUpdateErr);

								// Set assertions
								(advertiseUpdateRes.body._id).should.equal(advertiseSaveRes.body._id);
								(advertiseUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Advertises if not signed in', function(done) {
		// Create new Advertise model instance
		var advertiseObj = new Advertise(advertise);

		// Save the Advertise
		advertiseObj.save(function() {
			// Request Advertises
			request(app).get('/advertises')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Advertise if not signed in', function(done) {
		// Create new Advertise model instance
		var advertiseObj = new Advertise(advertise);

		// Save the Advertise
		advertiseObj.save(function() {
			request(app).get('/advertises/' + advertiseObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', advertise.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Advertise instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Advertise
				agent.post('/advertises')
					.send(advertise)
					.expect(200)
					.end(function(advertiseSaveErr, advertiseSaveRes) {
						// Handle Advertise save error
						if (advertiseSaveErr) done(advertiseSaveErr);

						// Delete existing Advertise
						agent.delete('/advertises/' + advertiseSaveRes.body._id)
							.send(advertise)
							.expect(200)
							.end(function(advertiseDeleteErr, advertiseDeleteRes) {
								// Handle Advertise error error
								if (advertiseDeleteErr) done(advertiseDeleteErr);

								// Set assertions
								(advertiseDeleteRes.body._id).should.equal(advertiseSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Advertise instance if not signed in', function(done) {
		// Set Advertise user 
		advertise.user = user;

		// Create new Advertise model instance
		var advertiseObj = new Advertise(advertise);

		// Save the Advertise
		advertiseObj.save(function() {
			// Try deleting Advertise
			request(app).delete('/advertises/' + advertiseObj._id)
			.expect(401)
			.end(function(advertiseDeleteErr, advertiseDeleteRes) {
				// Set message assertion
				(advertiseDeleteRes.body.message).should.match('User is not logged in');

				// Handle Advertise error error
				done(advertiseDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Advertise.remove().exec();
		done();
	});
});