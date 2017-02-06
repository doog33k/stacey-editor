(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('filestacey', {
            parent: 'entity',
            url: '/filestacey?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.file.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file/filesstacey.html',
                    controller: 'FileStaceyController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('file');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('filestacey-detail', {
            parent: 'entity',
            url: '/filestacey/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'staceyEditorApp.file.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/file/filestacey-detail.html',
                    controller: 'FileStaceyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('file');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'File', function($stateParams, File) {
                    return File.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'filestacey',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('filestacey-detail.edit', {
            parent: 'filestacey-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file/filestacey-dialog.html',
                    controller: 'FileStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('filestacey.new', {
            parent: 'filestacey',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file/filestacey-dialog.html',
                    controller: 'FileStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('filestacey', null, { reload: 'filestacey' });
                }, function() {
                    $state.go('filestacey');
                });
            }]
        })
        .state('filestacey.edit', {
            parent: 'filestacey',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file/filestacey-dialog.html',
                    controller: 'FileStaceyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('filestacey', null, { reload: 'filestacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('filestacey.delete', {
            parent: 'filestacey',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/file/filestacey-delete-dialog.html',
                    controller: 'FileStaceyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['File', function(File) {
                            return File.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('filestacey', null, { reload: 'filestacey' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
