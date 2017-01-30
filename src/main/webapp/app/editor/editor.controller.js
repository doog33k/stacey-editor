'use strict'

const sampleText="proc surveyselect data=EastHigh method=srs n=15 out=sample1;"
    ;


(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state'];

    function EditorController ($scope, $state) {
        var vm = this;

        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/sas");
        editor.session.setValue(sampleText)

        function register () {
            $state.go('register');
        }
    }
})();
