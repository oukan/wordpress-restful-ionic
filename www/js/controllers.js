angular.module('oukanblog.controllers', [])

//侧边栏菜单
.controller('SideMenus', function($rootScope, $scope, $state, $ionicSideMenuDelegate, TaxonomiesRes) {
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

//搜索
.controller('SearchCtrl', function($scope, PostsRes) {
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

//获得文章列表
.controller('DashCtrl', function($scope, $state, PostsRes) {
    PostsRes.query({
        theQquery: 'filter[posts_per_page]=10'
    }, function(data) {
        $scope.postList = data;
    });

    $scope.postItem = function(postId) {
        $state.go('tab.post-item', {
            postId: postId
        });
    };
})

//文章内容
.controller('PostItemCtrl', function($scope, $stateParams, PostItemRes) {
    var postId = $stateParams.postId;
    PostItemRes.get({
        postId: postId
    }, function(data) {
        $scope.postItem = data;
    });

})

//微博客
.controller('WeiboCtrl', function($scope, $state, PostsRes) {
    PostsRes.query({
        theQquery: 'filter[category_name]=weibo'
    }, function(data) {
        $scope.weiboList = data;
    });

    $scope.weiboItem = function(postId) {
        $state.go('tab.weibo-item', {
            postId: postId
        });
    }
})

//分类目录
.controller('CategoryCtrl', function($rootScope, $scope, $state, $stateParams, PostsRes) {
    var categorySlug = $stateParams.categorySlug,
        theQquery = 'filter[category_name]=' + categorySlug;
    $scope.categoryName = $rootScope.categoryName;
    PostsRes.query({
        theQquery: theQquery
    }, function(data) {
        $scope.postList = data;
    });

    $scope.postItem = function(postId) {
        $state.go('tab.post-item', {
            postId: postId
        }, {
            reload: true
        });
    }
})

//关于偶看
.controller('AccountCtrl', function($scope, PageItemRes) {
    PageItemRes.get({
        pageId: '605'
    }, function(data) {
        $scope.about = data;
    })
});
