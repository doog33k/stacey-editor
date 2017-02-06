(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('SessionStaceyDeleteController',SessionStaceyDeleteController);

    SessionStaceyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Session'];

    function SessionStaceyDeleteController($uibModalInstance, entity, Session) {
        var vm = this;

        vm.session = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Session.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
