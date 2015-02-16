angular.module( 'sailng.home', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			}
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, titleService , $rootScope, $http, $location, $window, UserModel) {
	titleService.setTitle('HOME');
	$scope.search=[];
	$scope.$watch('search.status_u',function(ne, old){
		if(ne == ""){
			$(".cuss").attr('checked',true);
		}else{
			$(".cuss").attr('checked',false);
			$(".cuss").attr('ng-checked',false);

		}
	})
 	$scope.setEmployee = function(employee) {
		$rootScope.employee = employee;
		var nwValue = employee.split('/');
    	$rootScope.employeeId = nwValue[1];
    	var user = {
    		"Username":nwValue[0],
    		'ID':nwValue[1]
    	};
    	if(employee == "selectp"){
    		$scope.selectp = 'Select Employee Name';
    		$scope.chk = false;
    		return false;
    	}else{
    		$scope.chk = true;
    	}
    	
    	$window.sessionStorage["userInfo"] = JSON.stringify(user);


	};
		
	//for redirect to view page for selected employee in dropdown
	$scope.rehome = function() {
		$scope.user =  JSON.parse($window.sessionStorage["userInfo"]);
		var userID = $scope.user.ID;
		$http.post('/api/initUser', {UserID : userID})
			.success(function(response) {
				
			});
		var usertab = {'tab': 'hr'};
    	$window.sessionStorage["userTab"] = JSON.stringify(usertab);
		if($scope.chk != true){
			alert("Please Select Employee")
		}else{
			$location.path('/view');
		}
	}


	//for redirect to view page
	$scope.redirt = function(id, name){
		var user = {
    		"Username":name,
    		'ID':id
    	};
    	$window.sessionStorage["userInfo"] = JSON.stringify(user);
    	var usertab = {'tab': 'hr'};
    	$window.sessionStorage["userTab"] = JSON.stringify(usertab);
    	$location.path('/view');
	}

	//for redirect to particular tab
	$scope.redirtTo = function(id, name, tab){
		
		var user = {
    		"Username":name,
    		'ID':id,
    	};
    	var usertab = {'tab': tab};
    	$window.sessionStorage["userInfo"] = JSON.stringify(user);
    	$window.sessionStorage["userTab"] = JSON.stringify(usertab);
    	$location.path('/view');
	}

	//for final response to show listing
	$scope.employeeVal = function() {
		$http.get('/api/users').success(function(response) {
			for(var i = 0; i < response.length; i++) {
				var hr = 0, documentation = 0, network = 0, rbd = 0;
				for (val in response[i].hr[0]) {
					if(response[i].hr[0][val] == "false"){
						response[i].hr[val] =  response[i].hr[0][val];
					}
					else if(response[i].hr[0][val] == "true"){
						hr++;
					}
				};
				for (val in response[i].documentation[0]) {
					if(response[i].documentation[0][val] == "false"){
						response[i].documentation[val] =  response[i].documentation[0][val];
					}
					else if(response[i].documentation[0][val] == "true"){
						documentation++;
					}
				};
				for (val in response[i].network[0]) {
					if(response[i].network[0][val] == "false"){
						response[i].network[val] =  response[i].network[0][val];
					}
					else if(response[i].network[0][val] == "true"){
						network++;
					}
				};
				for (val in response[i].rbd[0]) {
					if(response[i].rbd[0][val] == "false"){
						response[i].rbd[val] =  response[i].rbd[0][val];
					}
					else if(response[i].rbd[0][val] == "true"){
						rbd++;
					}
				};
				response[i]['status_u'] = (hr == 4 && documentation == 15 && rbd == 3 && network == 9) ? "Complete" : "Pending";
				response[i]['section'] = [];
				if(hr < 4 )
					response[i]['section'].push("HR");
				if(documentation < 15 )
					response[i]['section'].push("Documentation");
				if(rbd < 3 )
					response[i]['section'].push("Rbd");
				if(network < 9 )
					response[i]['section'].push("Network");

			}

				$scope.finalData = response;
		});
	};

	//for get all users
	UserModel.getAll($scope).then(function(models) {
		$rootScope.empdata = models;
	});


});

