(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('sessionstacey', {
            parent: 'entity',
            url: '/sessionstacey',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.session.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session/sessionsstacey.html',
                    controller: 'SessionStaceyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('session');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('sessionstacey-detail', {
            parent: 'entity',
            url: '/sessionstacey/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.session.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/session/sessionstacey-detail.html',
                    controller: 'SessionStaceyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('session');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Session', function($stateParams, Session) {
                    return Session.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'sessionstacey',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('sessionstacey-detail.edit', {
            parent: 'sessionstacey-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/sessionstacey-dialog.html',
                    controller: 'SessionStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sessionstacey.new', {
            parent: 'sessionstacey',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/sessionstacey-dialog.html',
                    controller: 'SessionStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                started: null,
                                ended: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('sessionstacey', null, { reload: 'sessionstacey' });
                }, function() {
                    $state.go('sessionstacey');
                });
            }]
        })
        .state('sessionstacey.edit', {
            parent: 'sessionstacey',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/sessionstacey-dialog.html',
                    controller: 'SessionStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sessionstacey', null, { reload: 'sessionstacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('sessionstacey.delete', {
            parent: 'sessionstacey',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/session/sessionstacey-delete-dialog.html',
                    controller: 'SessionStaceyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Session', function(Session) {
                            return Session.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('sessionstacey', null, { reload: 'sessionstacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
