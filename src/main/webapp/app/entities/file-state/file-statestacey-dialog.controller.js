(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('FileStateStaceyDialogController', FileStateStaceyDialogController);

    FileStateStaceyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FileState', 'File'];

    function FileStateStaceyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FileState, File) {
        var vm = this;

        vm.fileState = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
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
            if (vm.fileState.id !== null) {
                FileState.update(vm.fileState, onSaveSuccess, onSaveError);
            } else {
                FileState.save(vm.fileState, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('staceyEditorApp:fileStateUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.last = false;

        vm.setContent = function ($file, fileState) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fileState.content = base64Data;
                        fileState.contentContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
