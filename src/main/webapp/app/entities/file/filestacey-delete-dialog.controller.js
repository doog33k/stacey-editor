(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStaceyDeleteController',FileStaceyDeleteController);

    FileStaceyDeleteController.$inject = ['$uibModalInstance', 'entity', 'File'];

    function FileStaceyDeleteController($uibModalInstance, entity, File) {
        var vm = this;

        vm.file = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            File.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
