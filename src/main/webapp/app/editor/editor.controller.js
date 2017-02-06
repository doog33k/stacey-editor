'use strict'

var sampleText="proc surveyselect data=EastHigh method=srs n=15 out=sample1;"
    ;


(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state', '$stateParams', 'entity', 'File', 'FileState'];

    function EditorController ($scope, $state, $stateParams, entity, File, FileState) {
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
            if (vm.file.id !== null) {
                File.update(vm.file, onSaveSuccess, onSaveError);
                FileState.save({
                    fileForStateId : vm.file.id,
                    content : editor.session.getValue(),
                    contentContentType : 'TextBlob',
                }, onSaveSuccess, onSaveError);
            } else {
                File.save(vm.file, onSaveSuccess, onSaveError);
                FileState.save({
                    fileForStateId : vm.file.id,
                    content : editor.session.getValue(),
                    contentContentType : 'Clob',
                }, onSaveSuccess, onSaveError);
            }
        }

        vm.saveFile = saveFile;

        function onSaveSuccess (result) {
            alert('success');
            vm.isSaving = false;
        }

        function onSaveError () {
            alert('error');
            vm.isSaving = false;
        }
    }

})();
