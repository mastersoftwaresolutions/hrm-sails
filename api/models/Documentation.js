var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		offletter: {
			type: 'string'
		},
		idproof: {
			type: 'string'
		},
		addrproof: {
			type: 'string'
		},
		dob: {
			type: 'string'
		},
		training: {
			type: 'string'
		},
		slip: {
			type: 'string'
		},
		photo: {
			type: 'string'
		},
		qual: {
			type: 'string'
		},
		exp: {
			type: 'string'
		},
		medical: {
			type: 'string'
		},
		account: {
			type: 'string'
		},
		report: {
			type: 'string'
		},
		standards: {
			type: 'string'
		},
		agreement: {
			type: 'string'
		}, 
		ack: {
			type: 'string'
		},
		user: {
			model: 'user'
		},
		// A User can have many messages
		documentation: {
			collection: 'documentation'
		}
		 
	}

	
};