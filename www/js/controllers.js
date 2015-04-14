angular.module('oukanblog.controllers', [])

.controller('DashCtrl', function($scope, $state, PostsRes) {
    PostsRes.query({
        theQquery: 'filter[posts_per_page]=10'
    }, function(data) {
        $scope.postList = data;
    });

    $scope.postItem = function(postId) {
        $state.go('tab.postItem', {
            postId: postId
        }, {
            reload: true
        });
    }
})

.controller('PostItemCtrl', function($scope, $stateParams, PostItemRes) {
    var postId = $stateParams.postId;
    PostItemRes.get({
        postId: postId
    }, function(data) {
        $scope.postItem = data;
    });

})

.controller('WeiboCtrl', function($scope, $state, PostsRes) {
    PostsRes.query({
        theQquery: 'filter[category_name]=weibo'
    }, function(data) {
        $scope.weiboList = data;
    });

    $scope.weiboItem = function(postId) {
        $state.go('tab.weibo-item', {
            postId: postId
        }, {
            reload: true
        });
    }
})


.controller('AccountCtrl', function($scope, PageItemRes) {
    PageItemRes.get({
    	pageId: '605'
    },function(data){
    	$scope.about = data;
    })
});
