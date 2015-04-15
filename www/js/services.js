angular.module('oukanblog.services', [])
    //博文列表
    .factory('PostsRes', ['$resource', 'configuration', function($resource, configuration) {
        var pRes = $resource(configuration.apiUrl + '/posts?:theQquery', {
            theQquery: '@theQquery'
        }, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
        return pRes;
    }])
    //单篇博文
    .factory('PostItemRes', ['$resource', 'configuration', function($resource, configuration) {
        var piRes = $resource(configuration.apiUrl + '/posts/:postId', {
            postId: '@postId'
        }, {
            get: {
                method: 'GET'
            }
        });
        return piRes;
    }])
    //页面数据
    .factory('PageItemRes', ['$resource', 'configuration', function($resource, configuration) {
        var piRes = $resource(configuration.apiUrl + '/pages/:pageId', {
            pageId: '@pageId'
        }, {
            get: {
                method: 'GET'
            }
        });
        return piRes;
    }])
    //博文分类
    .factory('TaxonomiesRes', ['$resource', 'configuration', function($resource, configuration) {
        var tRes = $resource(configuration.apiUrl + '/taxonomies/category/terms', {}, {
            query: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
        return tRes;
    }]);
