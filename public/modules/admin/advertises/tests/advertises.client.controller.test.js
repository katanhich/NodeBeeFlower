'use strict';

(function() {
	// Advertises Controller Spec
	describe('Advertises Controller Tests', function() {
		// Initialize global variables
		var AdvertisesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Advertises controller.
			AdvertisesController = $controller('AdvertisesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Advertise object fetched from XHR', inject(function(Advertises) {
			// Create sample Advertise using the Advertises service
			var sampleAdvertise = new Advertises({
				name: 'New Advertise'
			});

			// Create a sample Advertises array that includes the new Advertise
			var sampleAdvertises = [sampleAdvertise];

			// Set GET response
			$httpBackend.expectGET('advertises').respond(sampleAdvertises);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.advertises).toEqualData(sampleAdvertises);
		}));

		it('$scope.findOne() should create an array with one Advertise object fetched from XHR using a advertiseId URL parameter', inject(function(Advertises) {
			// Define a sample Advertise object
			var sampleAdvertise = new Advertises({
				name: 'New Advertise'
			});

			// Set the URL parameter
			$stateParams.advertiseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/advertises\/([0-9a-fA-F]{24})$/).respond(sampleAdvertise);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.advertise).toEqualData(sampleAdvertise);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Advertises) {
			// Create a sample Advertise object
			var sampleAdvertisePostData = new Advertises({
				name: 'New Advertise'
			});

			// Create a sample Advertise response
			var sampleAdvertiseResponse = new Advertises({
				_id: '525cf20451979dea2c000001',
				name: 'New Advertise'
			});

			// Fixture mock form input values
			scope.name = 'New Advertise';

			// Set POST response
			$httpBackend.expectPOST('advertises', sampleAdvertisePostData).respond(sampleAdvertiseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Advertise was created
			expect($location.path()).toBe('/advertises/' + sampleAdvertiseResponse._id);
		}));

		it('$scope.update() should update a valid Advertise', inject(function(Advertises) {
			// Define a sample Advertise put data
			var sampleAdvertisePutData = new Advertises({
				_id: '525cf20451979dea2c000001',
				name: 'New Advertise'
			});

			// Mock Advertise in scope
			scope.advertise = sampleAdvertisePutData;

			// Set PUT response
			$httpBackend.expectPUT(/advertises\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/advertises/' + sampleAdvertisePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid advertiseId and remove the Advertise from the scope', inject(function(Advertises) {
			// Create new Advertise object
			var sampleAdvertise = new Advertises({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Advertises array and include the Advertise
			scope.advertises = [sampleAdvertise];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/advertises\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAdvertise);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.advertises.length).toBe(0);
		}));
	});
}());