/* by: 偶看 
 * http://www.oukan.net
 * 2015-04-14
 * 基于 tabs 修改
 */

angular.module('oukanblog', [
    'ionic',
    'ngResource',
    'oukanblog.controllers',
    'oukanblog.services'
])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })
    .constant('configuration', {
        apiUrl: 'http://www.oukan.net/wp-json'
    })

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

    .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/tab-dash.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.category', {
            url: '/category/:categorySlug',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/category.html',
                    controller: 'CategoryCtrl'
                }
            }
        })
        .state('tab.post-item', {
            url: "/post-item/:postId",
            views: {
                'tab-dash': {
                    templateUrl: 'templates/post-item.html',
                    controller: 'PostItemCtrl'
                }
            }
        })

    .state('tab.search', {
            url: '/search',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/search.html',
                    controller: 'SearchCtrl'
                }
            }
        })

    .state('tab.weibo', {
            url: '/weibo',
            views: {
                'tab-weibo': {
                    templateUrl: 'templates/tab-weibo.html',
                    controller: 'WeiboCtrl'
                }
            }
        })
        .state('tab.weibo-item', {
            url: '/weibo/:postId',
            views: {
                'tab-weibo': {
                    templateUrl: 'templates/weibo-item.html',
                    controller: 'PostItemCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/dash');

});
