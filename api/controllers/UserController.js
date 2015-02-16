module.exports = {
	getAll: function(req, res) {
		User.getAll()
		.spread(function(models) {
			res.json(models);
		})
		.fail(function(err) {
			// An error occured
		});
	},

	getOne: function(req, res) {
		User.getOne(req.param('id'))
		.spread(function(model) {
			res.json(model);
		})
		.fail(function(err) {
			// res.send(404);
		});
	},
	initUser:function(req, res) {
		User.findOne(req.body.UserID)
			.then(function(user) {
				User.update({id:req.body.UserID},{status: '1'})
				    .exec(function(err, U_user) {
				    	//console.log("updated", U_user)
				    });
				res.send('Updated')    
			})
			.catch(function(err){
				res.json(err)
			});
	},

	
	allemployee: function(req, res) { 
		User.find()
			.populate('hr')
			.populate('documentation')
			.populate('rbd')
			.populate('network')
			.then(function(users) {
				res.json(users);
			})
			.catch(function(err){
				res.json(err)
			});

	},

	create: function (req, res) {
		var model = {
			username: req.param('username'),
			email: req.param('email'),
			first_name: req.param('first_name'),
			last_name: req.param('last_name')
		};

		User.create(model)
		.exec(function(err, model) {
			if (err) {
				return console.log(err);
			}
			else {
				User.publishCreate(model.toJSON());
				res.json(model);
			}
		});
	}
};