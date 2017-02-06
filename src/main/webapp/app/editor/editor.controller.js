'use strict'

const sampleText="proc surveyselect data=EastHigh method=srs n=15 out=sample1;"
    ;


(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state', '$stateParams', 'entity', 'File'];

    function EditorController ($scope, $state, $stateParams, entity, File) {
        var vm = this;


        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/sas");

        load();

        function load(){
            editor.session.setValue(sampleText)
            //TODO load entity.filestate.content
        }

        function register () {
            $state.go('register');
        }

        function saveFile() {
            vm.isSaving = true;
            vm.file.filestates = {
                content : editor.session.getValue(),
                contentContentType : 'TextBlob',
            }
            if (vm.file.id !== null) {
                File.update(vm.file, onSaveSuccess, onSaveError);
            } else {
                File.save(vm.file, onSaveSuccess, onSaveError);
            }
        }

        vm.saveFile = saveFile;

        function onSaveSuccess (result) {
            // $scope.$emit('staceyEditorApp:fileStateUpdate', result);
            // $uibModalInstance.close(result);
            alert('success');
            vm.isSaving = false;
        }

        function onSaveError () {
            alert('error');
            vm.isSaving = false;
        }
    }

})();
