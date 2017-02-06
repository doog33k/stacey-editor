(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('SessionStaceyDetailController', SessionStaceyDetailController);

    SessionStaceyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Session', 'File'];

    function SessionStaceyDetailController($scope, $rootScope, $stateParams, previousState, entity, Session, File) {
        var vm = this;

        vm.session = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('staceyEditorApp:sessionUpdate', function(event, result) {
            vm.session = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
