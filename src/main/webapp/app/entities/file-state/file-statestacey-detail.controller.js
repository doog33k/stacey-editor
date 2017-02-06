(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStateStaceyDetailController', FileStateStaceyDetailController);

    FileStateStaceyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'FileState', 'File'];

    function FileStateStaceyDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, FileState, File) {
        var vm = this;

        vm.fileState = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('staceyEditorApp:fileStateUpdate', function(event, result) {
            vm.fileState = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
