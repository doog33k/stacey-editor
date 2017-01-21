(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state'];

    function EditorController ($scope, $state) {
        var vm = this;

        function register () {
            $state.go('register');
        }
    }
})();
