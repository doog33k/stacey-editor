(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('editor', {
            parent: 'app',
            url: '/editor',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/editor/editor.html',
                    controller: 'EditorController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'File', function($stateParams, File) {
                    return $stateParams.id != null ? File.get({id : $stateParams.id}).$promise : {};
                }],
            }
        })
    }
})();
