var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		first_name: {
			type: 'string',
			required: true
		},
		last_name: {
			type: 'string'
		},

		hr: {
			collection: 'hr',
			via: 'user'
		},
		documentation: {
			collection: 'documentation',
			via: 'user'
		},
		rbd: {
			collection: 'rbd',
			via: 'user'
		},
		status:{
			type: 'string',
			defaultsTo: '0'
		},
		network: {
			collection: 'network',
			via: 'user'
		},
		passports : { collection: 'Passport', via: 'user' }
	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	}
};