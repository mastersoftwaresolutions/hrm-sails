angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;
    //console.log($scope.currentUser);
    if(typeof $scope.currentUser != 'undefined')                    
        $scope.displayName = $scope.currentUser.first_name + $scope.currentUser.last_name;
    
    var navItems = [
        {title: 'Messages', translationKey: 'navigation:messages', url: '/messages', cssClass: 'fa fa-comments'},
        {title: 'About', translationKey: 'navigation:about', url:'/about',cssClass: 'fa fa-info-circle'}
    ];

    if (!$scope.currentUser) {
        navItems.push({title: 'Register', translationKey: 'navigation:register', url: '/register', cssClass: 'fa fa-briefcase'});
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-comments'});
    }

    $scope.navItems = navItems;
});