app.controller('ProceedQcmCtrl', [ '$scope', '$routeParams', 'DataAccess', 'ENTITY', 'SessionService', '$rootScope', '$timeout','$location',
    function($scope, $routeParams, DataAccess, ENTITY, SessionService, $rootScope, $timeout, $location) {
        $scope.step = 1; //Initialize step to questions
        $scope.qcm;
        $scope.calculateScore = function() {
            var totalScore = 0;
            angular.forEach($scope.qcm.questions, function(question){
                var correctAnswers = 0;
                var score = 0;
                angular.forEach(question.answers, function(answer) {
                    if(answer.status == 1) {
                        correctAnswers ++;
                       if($('#answer'+answer.id).hasClass('checked')) {
                           score++;
                       } else {
                           score--;
                           $('#answer'+answer.id).closest('.field').addClass('error');
                       }
                    } else {
                        if($('#answer'+answer.id).hasClass('checked')) {
                            score--;
                            $('#answer'+answer.id).closest('.field').addClass('error');
                        }
                    }
                    $('#answer'+answer.id).addClass('read-only');
                });
                if(score == correctAnswers) {
                    //User has checked all right answers
                    totalScore ++;
                }

            });
            $('#calculateScoreBtn').remove();
            var finalScore = Math.round((totalScore/$scope.qcm.questions.length)*100);


            $scope.score = finalScore;
            $('#scoreDimmer').dimmer('show');


            DataAccess.create(ENTITY.score, { score: $scope.score, user_id: SessionService.getUser().id, qcm_id:$scope.qcm.id}).then(function(data) {
                $scope.step = 2;
                $rootScope.$emit('completeQcm');
                $rootScope.notify('Merci, vous allez être redirigé vers l\'accueil.','info');
                $timeout(function() { $location.path('/') }, 3000);
            });
        };

        DataAccess.getDataById(ENTITY.qcm, $routeParams.id).then(
            function(qcm) {
                $scope.qcm = qcm;
                $('.loading').removeClass('loading');
                $scope.$on('onRepeatLast', function() {
                    angular.forEach($scope.qcm.questions, function(question){
                        angular.forEach(question.answers, function(answer) {
                            $('#answer'+answer.id).checkbox();
                        });
                    });
                });
            }
        );




}]);