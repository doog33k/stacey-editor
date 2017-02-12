(function() {
    'use strict';
    angular
        .module('staceyEditorApp')
        .factory('FileState', FileState);

    FileState.$inject = ['$resource', 'DateUtils'];

    function FileState ($resource, DateUtils) {
        var resourceUrl =  'api/file-states/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.lastModification = DateUtils.convertDateTimeFromServer(data.lastModification);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
