(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStateStaceyController', FileStateStaceyController);

    FileStateStaceyController.$inject = ['$scope', '$state', 'DataUtils', 'FileState'];

    function FileStateStaceyController ($scope, $state, DataUtils, FileState) {
        var vm = this;

        vm.fileStates = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            FileState.query(function(result) {
                vm.fileStates = result;
                vm.searchQuery = null;
            });
        }
    }
})();
