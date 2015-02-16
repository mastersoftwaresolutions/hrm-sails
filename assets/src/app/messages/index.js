angular.module( 'sailng.messages', ['uiSwitch'])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'messages', {
		url: '/view',
		views: {
			"main": {
				controller: 'MessagesCtrl',
				templateUrl: 'messages/index.tpl.html'
			}
		}
	});
})


.controller( 'MessagesCtrl', function MessagesController( $scope, $sails, lodash, $window, config, titleService, MessageModel, $rootScope, $location, $http) {
	titleService.setTitle('View');
		
	$scope.currentUser = config.currentUser;

	
	$scope.user =  JSON.parse($window.sessionStorage["userInfo"]);
	
		// firstly all values are false
		$scope.infosheet = false;
		$scope.addr = false;
		$scope.biometric = false;
		$scope.teamfolder = false;
		$scope.offletter = false;
		$scope.idproof = false;
		$scope.addrproof = false;
		$scope.dob = false;
		$scope.training = false;
		$scope.slip = false;
		$scope.photo = false;
		$scope.qual = false;
		$scope.exp = false;
		$scope.medical = false;
		$scope.account = false;
		$scope.report = false;
		$scope.standards = false;
		$scope.agreement = false;
		$scope.infosheet = false;
		$scope.infosheet = false;
		$scope.infosheet = false;
		$scope.infosheet = false;
		$scope.ack = false; 
		$scope.biddle = false;
		$scope.cover = false;
		$scope.google = false;
		$scope.firewall = false;
		$scope.pswd = false;
		$scope.skype = false;
		$scope.redmine = false;
		$scope.bitbucket = false;
		$scope.git = false;
		$scope.dropbox = false;
		$scope.localdb = false;
		$scope.localftp = false;
	
	// for active tab
	$scope.hr = true;	
	$scope.hrActive = "active";
	$scope.docActive ="";
	$scope.rbdActive ="";
	$scope.networkActive ="";

	//for tab which is clicked
	$scope.showTab = function(arg){
		
		if(arg === 'hr'){
			$scope.hrActive = "active";
			$scope.docActive ="";
			$scope.rbdActive ="";
			$scope.networkActive ="";
			$scope.hr = true;
			$scope.documentation = false;
			$scope.rbd = false;
			$scope.network =false;

		}else if(arg === 'documentation'){
			$scope.docActive ="active";
			$scope.rbdActive ="";
			$scope.networkActive ="";
			$scope.hrActive = "";
			$scope.hr = false;
			$scope.rbd = false;
			$scope.network =false;
			$scope.documentation = true;
		}else if(arg === 'rbd'){
			$scope.rbdActive ="active";
			$scope.docActive ="";
			$scope.networkActive ="";
			$scope.hrActive = "";
			$scope.hr = false;
			$scope.documentation = false;
			$scope.network =false;
			$scope.rbd = true;
		}else if(arg === 'network'){
			$scope.networkActive ="active";
			$scope.docActive ="";
			$scope.rbdActive ="";
			$scope.hrActive = "";
			$scope.hr = false;
			$scope.documentation = false;
			$scope.rbd = false;
			$scope.network = true;
		}
	};
  	var tab = JSON.parse($window.sessionStorage["userTab"]);
	$scope.showTab(tab.tab.toLowerCase());

	//for save the value of switch
	$scope.update = 0;
	$scope.saveVal = function() {
		var hr = {};
		var documentation = {};
		var rbd = {};
		var network = {};
		var uID = $scope.user.ID;
		$scope.message = 'Save Successfully';
		setTimeout(function(){
			$scope.message = '';
			$scope.$apply();
		}, 2000);
		//array for hr
		hr.infosheet = $scope.infosheet;
		hr.addr = $scope.addr;
		hr.biometric = $scope.biometric;
		hr.teamfolder = $scope.teamfolder;
		hr.user = uID;
		
		//array for documentation
		documentation.offletter = $scope.offletter;
		documentation.idproof = $scope.idproof;
		documentation.addrproof = $scope.addrproof;
		documentation.dob = $scope.dob;
		documentation.training = $scope.training;
		documentation.slip = $scope.slip;
		documentation.photo = $scope.photo;
		documentation.qual = $scope.qual;
		documentation.exp = $scope.exp;
		documentation.medical = $scope.medical;
		documentation.account = $scope.account;
		documentation.report = $scope.report;
		documentation.standards = $scope.standards;
		documentation.agreement = $scope.agreement;
		documentation.ack = $scope.ack;
		documentation.user = uID;
		
		//array for rbd
		rbd.biddle = $scope.biddle;
		rbd.cover = $scope.cover;
		rbd.google = $scope.google;
		rbd.user = uID;
		
		//array for network
		network.firewall = $scope.firewall;
		network.pswd = $scope.pswd;
		network.skype = $scope.skype;
		network.redmine = $scope.redmine;
		network.bitbucket = $scope.bitbucket;
		network.git = $scope.git;
		network.dropbox = $scope.dropbox;
		network.localdb = $scope.localdb;
		network.localftp = $scope.localftp;
		network.user = uID;
		
		var finalArr = {};
		finalArr.hr = hr;
		finalArr.documentation = documentation;
		finalArr.rbd = rbd;
		finalArr.network = network;
		
		if($scope.update == 1){
			$http.post('/api/message/update/'+uID, finalArr).success(function(response) {
				
			}) .error(function(response) {
				$scope.error = response.message;
		});
		}else if($scope.update == 0){
			$http.post('/api/message/save' , finalArr).success(function(response) {
			$scope.update = 1;
			
		}) .error(function(response) {
			$scope.error = response.message;
		});
		}
	};

	//for get the value of switch 
	$scope.switchVal = function(){
		var uID = $scope.user.ID;
		$http.get('/api/message/'+uID).success(function(response) {
			
			if(Object.keys(response).length) {
				$scope.update = 1;
			if(response.hr.infosheet == 'true') {
				$scope.infosheet = true;
			} 
			if(response.hr.addr == 'true') {
				$scope.addr = true;
			}
			if(response.hr.biometric == 'true') {
				$scope.biometric = true;
			}
			if(response.hr.teamfolder == 'true') {
				$scope.teamfolder = true;
			}
			if(response.doc.offletter == 'true') {
				$scope.offletter = true;
			}
			if(response.doc.idproof == 'true') {
				$scope.idproof = true;
			} 
			if(response.doc.addrproof == 'true') {
				$scope.addrproof = true;
			}
			if(response.doc.dob == 'true') {
				$scope.dob = true;
			}
			if(response.doc.training == 'true') {
				$scope.training = true;
			}
			if(response.doc.slip == 'true') {
				$scope.slip = true;
			}
			if(response.doc.photo == 'true') {
				$scope.photo = true;
			}
			if(response.doc.qual == 'true') {
				$scope.qual = true;
			}
			if(response.doc.exp == 'true') {
				$scope.exp = true;
			}
			if(response.doc.medical == 'true') {
				$scope.medical = true;
			}
			if(response.doc.account == 'true') {
				$scope.account = true;
			}
			if(response.doc.report == 'true') {
				$scope.report = true;
			}
			if(response.doc.standards == 'true') {
				$scope.standards = true;
			}
			if(response.doc.agreement == 'true') {
				$scope.agreement = true;
			}
			if(response.doc.ack == 'true') {
				$scope.ack = true;
			}
			if(response.rbd.biddle == 'true') {
				$scope.biddle = true;
			}
			if(response.rbd.cover == 'true') {
				$scope.cover = true;
			}
			if(response.rbd.google == 'true') {
				$scope.google = true;
			}
			if(response.network.firewall == 'true') {
				$scope.firewall = true;
			}
			if(response.network.pswd == 'true') {
				$scope.pswd = true;
			} 
			if(response.network.skype == 'true') {
				$scope.skype = true;
			}
			if(response.network.redmine == 'true') {
				$scope.redmine = true;
			}
			if(response.network.bitbucket == 'true') {
				$scope.bitbucket = true;
			}
			if(response.network.git == 'true') {
				$scope.git = true;
			} 
			if(response.network.dropbox == 'true') {
				$scope.dropbox = true;
			}
			if(response.network.localdb == 'true') {
				$scope.localdb = true;
			}
			if(response.network.localftp == 'true') {
				$scope.localftp = true;
			}
			}
		}).error(function(response) {
			$scope.error = response.message;
		});
	};

});

