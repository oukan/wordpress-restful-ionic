angular.module('oukanblog.services', [])

.factory('PostsRes',['$resource', 'configuration' ,function($resource, configuration) {
    var pRes = $resource(configuration.apiUrl + '/posts?:theQquery', {
      theQquery:'@theQquery'
    }, {
        query: {
            method: 'GET',
            cache: true,
            isArray: true
        }
    });
    return pRes;
}])

.factory('PostItemRes',['$resource', 'configuration' ,function($resource, configuration) {
    var piRes = $resource(configuration.apiUrl + '/posts/:postId', {
      postId:'@postId'
    }, {
        get: {
            method: 'GET'
        }
    });
    return piRes;
}])

.factory('PageItemRes',['$resource', 'configuration' ,function($resource, configuration) {
    var piRes = $resource(configuration.apiUrl + '/pages/:pageId', {
      pageId:'@pageId'
    }, {
        get: {
            method: 'GET'
        }
    });
    return piRes;
}]);
