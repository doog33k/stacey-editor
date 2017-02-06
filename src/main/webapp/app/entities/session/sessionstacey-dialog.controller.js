(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('SessionStaceyDialogController', SessionStaceyDialogController);

    SessionStaceyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Session', 'File'];

    function SessionStaceyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Session, File) {
        var vm = this;

        vm.session = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.files = File.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.session.id !== null) {
                Session.update(vm.session, onSaveSuccess, onSaveError);
            } else {
                Session.save(vm.session, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('staceyEditorApp:sessionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.started = false;
        vm.datePickerOpenStatus.ended = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
