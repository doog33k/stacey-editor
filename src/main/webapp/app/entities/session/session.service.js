(function() {
    'use strict';
    angular
        .module('staceyEditorApp')
        .factory('Session', Session);

    Session.$inject = ['$resource', 'DateUtils'];

    function Session ($resource, DateUtils) {
        var resourceUrl =  'api/sessions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.started = DateUtils.convertDateTimeFromServer(data.started);
                        data.ended = DateUtils.convertDateTimeFromServer(data.ended);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
