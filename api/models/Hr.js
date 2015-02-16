var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		infosheet: {
			type: 'string'
		},
		addr: {
			type: 'string'
		},
		biometric: {
			type: 'string'
		},
		teamfolder: {
			type: 'string'
		},
		user: {
			model: 'user'
		},
		
		hr: {
			collection: 'hr'
		}
		// passports : { collection: 'Passport', via: 'hr' }
	}

	
};