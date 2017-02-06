(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('file-statestacey', {
            parent: 'entity',
            url: '/file-statestacey',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.fileState.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file-state/file-statesstacey.html',
                    controller: 'FileStateStaceyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fileState');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('file-statestacey-detail', {
            parent: 'entity',
            url: '/file-statestacey/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.fileState.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file-state/file-statestacey-detail.html',
                    controller: 'FileStateStaceyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fileState');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FileState', function($stateParams, FileState) {
                    return FileState.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'file-statestacey',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('file-statestacey-detail.edit', {
            parent: 'file-statestacey-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-state/file-statestacey-dialog.html',
                    controller: 'FileStateStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FileState', function(FileState) {
                            return FileState.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('file-statestacey.new', {
            parent: 'file-statestacey',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-state/file-statestacey-dialog.html',
                    controller: 'FileStateStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                version: null,
                                last: null,
                                content: null,
                                contentContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('file-statestacey', null, { reload: 'file-statestacey' });
                }, function() {
                    $state.go('file-statestacey');
                });
            }]
        })
        .state('file-statestacey.edit', {
            parent: 'file-statestacey',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-state/file-statestacey-dialog.html',
                    controller: 'FileStateStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FileState', function(FileState) {
                            return FileState.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('file-statestacey', null, { reload: 'file-statestacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('file-statestacey.delete', {
            parent: 'file-statestacey',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file-state/file-statestacey-delete-dialog.html',
                    controller: 'FileStateStaceyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FileState', function(FileState) {
                            return FileState.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('file-statestacey', null, { reload: 'file-statestacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
