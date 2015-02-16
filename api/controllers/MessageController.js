var _ = require('lodash');

module.exports = {
	getAll: function(req, res) {
		Message.getAll()
		.spread(function(models) {
			Message.watch(req);
			Message.subscribe(req.socket, models);

			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		Message.getOne(req.param('id'))
		.spread(function(model) {
			Message.subscribe(req.socket, model);
			res.json(model);
		})
		.fail(function(err) {
			res.send(404);
		});
	},

	//get the switch value
	getswitchVal: function(req, res) {
		//console.log(req.param('id'));
		Hr.findOne({
		
			user: req.param('id')

		}, function(err, hr) { 
			if(err) {
				res.send(404);
			}else {
				
		Documentation.findOne({
		
			user: req.param('id')

		}, function(err, doc) { 
			if(err) {
				res.send(404);
			}else {

		Rbd.findOne({
		
			user: req.param('id')

		}, function(err, rbd) { 
			if(err) {
				res.send(404);
			}else {

		Network.findOne({
		
			user: req.param('id')

		}, function(err, network) { 
			if(err) {
				res.send(404);
			}else {
				res.json({hr: hr, doc: doc, rbd: rbd, network: network});
			}
		});
			}
		});
			}
		});
			}
		});
	},

	//save the value of switch
	save: function(req, res) {
		//for hr
		Hr.create(req.body.hr)
		.exec(function(err, hrval) {
			if (err) { 
				return res.serverError(err);
			}else {
		//for documentation
		Documentation.create(req.body.documentation)
		.exec(function(err, docval) {
			if (err) { 
				return res.serverError(err);
			}else {
		//for rbd
		Rbd.create(req.body.rbd)
		.exec(function(err, rbdval) {
			if (err) { 
				return res.serverError(err);
			}else {
		//for network
		Network.create(req.body.network)
		.exec(function(err, networkval) {
			if (err) {
				return res.serverError(err);
			}else {
				res.json({hrval: hrval, docval: docval, rbdval: rbdval, networkval: networkval});
			}
		});
			}
		});
			}
		});
			}
		});

	},


	//update the value of switch
	update: function (req, res) { 
		//update hr 
		Hr.update({
			user: req.param('user')
		}, req.body.hr)
			.then(function(hrval){
				//update documentation
				Documentation.update({
					user: req.param('user')
				}, req.body.documentation)
					.then(function(docval){
						//update rbd
						Rbd.update({
							user: req.param('user')
						}, req.body.rbd)
							.then(function(rbdval){
								//update network
								Network.update({
									user: req.param('user')
								}, req.body.network)
									.then(function(networkval){
										res.json({hrval: hrval, docval: docval, rbdval: rbdval, networkval: networkval});
									})
									.catch(function(error){
										res.json(error)
									});
							})
							.catch(function(error){
								res.json(error)
							});
					})
					.catch(function(error){
						res.json(error)
					});
			})
			.catch(function(error){
				res.json(error)
			});

		
	},



};