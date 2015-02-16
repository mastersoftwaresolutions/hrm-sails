var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		biddle: {
			type: 'string'
		},
		cover: {
			type: 'string'
		},
		google: {
			type: 'string'
		},
		user: {
			model: 'user'
		},
		// A User can have many messages
		rbd: {
			collection: 'rbd'
		}
	}

	
};