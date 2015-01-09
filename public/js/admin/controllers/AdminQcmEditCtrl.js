app.controller('AdminQcmEditCtrl',
    ['$scope', '$compile', 'Utils','ENTITY', 'DataAccess', 'SessionService', '$location',
        function($scope, $compile, Utils, ENTITY, DataAccess, SessionService, $location) {
            $scope.questions = {};
            $scope.nbQuestion = 1;
            $scope.formError = false;
            $scope.formErrors = { questions : { answers : {} } };
            $scope.currentQcm = {
                title: '',
                description: '',
                class_level: ''
            };
            console.info('$scope.formError', $scope.formError);
            $('#validateQcm').modal();
            $('select.dropdown').dropdown('setting', 'onChange' ,function() {
                $scope.currentQcm.class_level = $(this).dropdown('get value')
            });

            $('.ui.modal').modal();

            $scope.removeQuestion = function($event) {
                var segment = $($event.currentTarget).closest('.ui.segment');
                var id = segment.data('id');

                delete $scope.questions[id];
                console.log($scope.questions);

                segment.fadeOut().remove();

                $scope.nbQuestion--;
            };

            $scope.addQuestion = function() {
                var guid = Utils.guid();
                $scope.questions[guid] = { content : '', answers: {} };

                var html = [
                    '<div class="ui segment" data-id="'+guid+'">',
                        '<div class="ui top attached label small left blue"><i class="icon help"></i>Question:</div>',
                            '<div class="ui top attached label small right remove-question" ng-click="removeQuestion($event);">',
                                '<i class="icon close"></i> &nbsp;Supprimer',
                            '</div>',
                        '<div class="invisible ui divider"></div>',
                    '<div class="ui error form" ng-show="newQcm.$submitted && questions[\''+guid+'\'].noAnswer ">',
                    '<div class="ui error small message">',
                    '<div class="header">',
                        'Veuillez renseigner au minimum une bonne réponse',
                    '</div>',
                    '</div>',
                    '</div>',
                        '<div class="field" ng-class="{ error: newQcm.$submitted && questions[\''+guid+'\'].contentError }">',
                            '<label><i class="icon help"></i>Question</label>',
                            '<input type="text" placeholder="Entrez ici la question" required ng-model="questions[\''+guid+'\'].content" required>',
                        '</div>',
                        '<div class="ui divider"></div>',
                         '<div class="field" id="answers'+guid+'">',
                            '<div class="ui button tiny positive" ng-click="addAnswer(\''+guid+'\')">Ajouter une réponse</div>',
                        '</div>',
                    '</div>'
                ].join('');



                // pre compile for ng-click working in injected html
                $('#questions').append($compile(html)($scope));
                $('html, body').animate({
                    scrollTop: $('#addQuestionButton').offset().top
                }, 1000);

            };

            $scope.addAnswer = function(questionGuid) {
                var guid = Utils.guid();
                $scope.questions[questionGuid].answers[guid] = { content: '', status: 0};


                var html = [
                    '<div class="two fields">',
                    '<div class="field" ng-class="{ error: newQcm.$submitted && questions[\''+questionGuid+'\'].answers[\''+guid+'\'].contentError }">',
                    '<label><i class="icon certificate"></i>Réponse</label>',
                    '<input placeholder="Saisissez la réponse" type="text"  ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].content" required>',
                    '</div>',
                    '<div class="field">',
                    '<label>Valeur</label>',
                    '<div class="ui radio checkbox">',
                    '<input type="radio" name="value'+guid+'" value="1">',
                    '<label>Bonne réponse</label>',
                    '</div>&nbsp;&nbsp;',
                    '<div class="ui radio checkbox">',
                    '<input type="radio" name="value'+guid+'" value="0" ng-model="questions[\''+questionGuid+'\'].answers[\''+guid+'\'].status">',
                    '<label>Mauvaise réponse</label>',
                    '</div>',
                    '</div>'
                ].join('');

                $('#answers'+questionGuid).prepend($compile(html)($scope));
                $('.ui.radio.checkbox')
                    .checkbox('setting', 'onChange' ,function() {
                        $scope.setAnswerStatus(questionGuid, guid, this[0].value);
                    });

                $('html, body').animate({
                    scrollTop: $('#answers'+questionGuid).offset().top
                }, 1000);

            };

            // Process validation qcm
            $scope.submitQcm = function() {
                angular.forEach($scope.questions, function(question) {
                    answers = question.answers;
                    question.answers = [];
                    angular.forEach(answers, function(answer) {
                        question.answers.push(answer);
                    });
                    $scope.currentQcm.questions.push(question);
                });
                DataAccess.create(ENTITY.qcm, $scope.currentQcm).then( function(data) {
                    $location.path('/admin/dashboard');
                });
            };

            $scope.setAnswerStatus = function(questionGuid, answerGuid, val) {
                $scope.questions[questionGuid].answers[answerGuid].status = parseInt(val);
            };

            $scope.openValidateQcmModal = function() {
                if($scope.newQcm.$valid){
                    var error = false;
                    angular.forEach($scope.questions, function(question, guid) {
                        if(question.content == '') {
                            $scope.questions[guid].contentError = true;
                            console.log('question has not content');
                            error =true;
                        }
                        var noAnswer = true;
                        angular.forEach(question.answers, function(answer, answerGuid) {
                            if(answer.content == '') {
                                $scope.questions[guid].answers[answerGuid].contentError = true;
                                console.log('answer has not content');
                                error = true;
                            }
                            console.log(answer.status);
                            if(answer.status == 1) {
                                noAnswer = false;
                            }
                        });
                        if(noAnswer) {
                            $scope.questions[guid].noAnswer = true;
                            console.log('no right answers');
                            error = true;
                        }
                    });
                    console.log(error);

                    if(error) {
                        $('html, body').animate({
                            scrollTop: $('.error').first().offset().top
                        }, 1000);
                        return;
                    } else {
                        $scope.currentQcm.questions = [];
                        $('#validateQcm').modal('show');

                    }
                } else {
                    $('html, body').animate({
                        scrollTop: $('body').offset().top
                    }, 1000);
                }




            };

        }]);