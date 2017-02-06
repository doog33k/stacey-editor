(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStateStaceyDeleteController',FileStateStaceyDeleteController);

    FileStateStaceyDeleteController.$inject = ['$uibModalInstance', 'entity', 'FileState'];

    function FileStateStaceyDeleteController($uibModalInstance, entity, FileState) {
        var vm = this;

        vm.fileState = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FileState.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
