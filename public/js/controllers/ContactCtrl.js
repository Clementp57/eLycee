app.controller('ContactCtrl', ['$scope','$http', function($scope,$http) {
  
	$scope.master = {}; // juste pour des test de recuperation de données
	
	$scope.result = 'hidden';
    $scope.resultMessage;
    $scope.formData; //formData pour stocker tous les elements du formulaire
    $scope.submitButtonDisabled = false;
    $scope.submitted = false;


	$scope.$on('mapInitialized', function(event, map) {
	// TODO : do some nasty stuffs here ;)
	});

	$scope.sendMessage = function(contact) {
		$scope.master = angular.copy(contact);
		$scope.formData= angular.copy(contact);
        // OK 
	};

	$scope.resetMessage = function() {
		$scope.contact = {};

        //OK
	};	

    $scope.submit = function(contactform) { 
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid){
            
            $http({

                method  : 'POST',
                url     : '/api/v1/contact/', // url api LARAVEL
                data    : $scope.formData,  // données à envoyer
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
            
            }).success(function(data){

                console.log(data);
                
                if (data.success){
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                
                }else{
                
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });

        }else{
    
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Erreur :( Verifier toutes les infos.';
            $scope.result='bg-danger';
        }
    }
    
    $scope.resetMessage();

}]);

