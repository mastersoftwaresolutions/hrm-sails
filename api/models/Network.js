var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		firewall: {
			type: 'string'
		},
		pswd: {
			type: 'string'
		},
		skype: {
			type: 'string'
		},
		redmine: {
			type: 'string'
		},
		bitbucket: {
			type: 'string'
		},
		git: {
			type: 'string'
		},
		dropbox: {
			type: 'string'
		},
		localdb: {
			type: 'string'
		},
		localftp: {
			type: 'string'
		},
		user: {
			model: 'user'
		},
		
		network: {
			collection: 'network'
		}
	}

	
};