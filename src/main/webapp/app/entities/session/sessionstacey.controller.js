(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('SessionStaceyController', SessionStaceyController);

    SessionStaceyController.$inject = ['$scope', '$state', 'Session'];

    function SessionStaceyController ($scope, $state, Session) {
        var vm = this;

        vm.sessions = [];

        loadAll();

        function loadAll() {
            Session.query(function(result) {
                vm.sessions = result;
                vm.searchQuery = null;
            });
        }
    }
})();
