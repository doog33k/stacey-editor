(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStaceyDialogController', FileStaceyDialogController);

    FileStaceyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'File', 'Session', 'FileState'];

    function FileStaceyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, File, Session, FileState) {
        var vm = this;

        vm.file = entity;
        vm.clear = clear;
        vm.save = save;
        vm.sessions = Session.query();
        vm.filestates = FileState.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.file.id !== null) {
                File.update(vm.file, onSaveSuccess, onSaveError);
            } else {
                File.save(vm.file, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('staceyEditorApp:fileUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
