(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStaceyDetailController', FileStaceyDetailController);

    FileStaceyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'File', 'Session', 'FileState'];

    function FileStaceyDetailController($scope, $rootScope, $stateParams, previousState, entity, File, Session, FileState) {
        var vm = this;

        vm.file = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('staceyEditorApp:fileUpdate', function(event, result) {
            vm.file = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
