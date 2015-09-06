angular.module('oukanblog.controllers', [])

//侧边栏菜单 Sidebar menu
.controller('SideMenus', function($rootScope, $scope, $state, $ionicSideMenuDelegate, configuration, TaxonomiesRes) {
    $scope.websiteName = configuration.websiteName
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    TaxonomiesRes.query({}, function(data) {
        $scope.taxonomies = data;
    });

    $scope.category = function(name, slug) {
        $rootScope.categoryName = name;
        $state.go('tab.category', {
            categorySlug: slug
        });
    }
})

//搜索 Search
.controller('SearchCtrl', function($scope, $state, PostsRes) {
    $scope.search = function(searchTerm) {
        var theQquery = 'filter[s]=' + searchTerm;
        PostsRes.query({
            theQquery: theQquery
        }, function(data) {
            $scope.postList = data;
        });
    };

    $scope.postItem = function(postId) {
        $state.go('tab.post-item', {
            postId: postId
        });
    };

})

//获得文章列表 All posts list
.controller('DashCtrl', function($rootScope, $scope, $state, configuration, PostsRes) {
    $scope.websiteName = configuration.websiteName
    $scope.init = {
        busy: true,
        after: 1,
        page: 1,
        perPage: 10
    };
    $scope.items = [];
    $scope.loadMore = function() {
        var theQquery = 'filter[posts_per_page]=' + $scope.init.perPage + '&page=' + $scope.init.page;
        PostsRes.query({
            theQquery: theQquery
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $scope.items.push(data[i]);
            }
            $scope.init.page++;
            data.length === 0 ? $scope.init.busy = false : $scope.init.busy = true; // 是否结束
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });

    $scope.postItem = function(postId) {
        $state.go('tab.post-item', {
            postId: postId
        });
    };
})

//文章内容 Post content
.controller('PostItemCtrl', function($scope, $stateParams, PostItemRes) {
    var postId = $stateParams.postId;
    PostItemRes.get({
        postId: postId
    }, function(data) {
        $scope.postItem = data;
    });

})

//分类目录 Category
.controller('CategoryCtrl', function($rootScope, $scope, $location, $state, $stateParams, PostsRes) {
    var categorySlug = $stateParams.categorySlug;
    $scope.categoryName = $rootScope.categoryName;
    if ($location.path().indexOf('weibo') !== -1) {
        $scope.categoryName = '微博客';
        categorySlug = 'weibo'
    }

    $scope.init = {
        busy: true,
        after: 1,
        page: 1,
        perPage: 10
    };
    $scope.items = [];
    $scope.loadMore = function() {
        var theQquery = 'filter[category_name]=' + categorySlug + '&filter[posts_per_page]=' + $scope.init.perPage + '&page=' + $scope.init.page;
        PostsRes.query({
            theQquery: theQquery
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $scope.items.push(data[i]);
            }
            $scope.init.page++;
            data.length === 0 ? $scope.init.busy = false : $scope.init.busy = true; // 是否结束
            $rootScope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
    });

    $scope.postItem = function(postId) {
        $state.go('tab.post-item', {
            postId: postId
        }, {
            reload: true
        });
    }
})

//关于偶看 about me
.controller('AccountCtrl', function($scope, PageItemRes) {
    PageItemRes.get({
        pageId: '605'
    }, function(data) {
        $scope.about = data;
    })
})

//分享 share
.controller('ShareCtrl', ['$scope', function($scope) {
    $scope.whatsappShare = function() {
        window.plugins.socialsharing.shareViaWhatsApp('Digital Signature Maker', null /* img */ , "https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker" /* url */ , null, function(errormsg) {
            alert("Error: Cannot Share")
        });
    }
    $scope.twitterShare = function() {
        window.plugins.socialsharing.shareViaTwitter('Digital Signature Maker', null /* img */ , 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker', null, function(errormsg) {
            alert("Error: Cannot Share")
        });
    }
    $scope.OtherShare = function() {
        window.plugins.socialsharing.share('Digital Signature Maker', null, null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
    }

}])
