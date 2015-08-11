EthPW.controllers.seeding = function ($scope, $state) {
    var that = this;
    that.seeded = false;
    $scope.movesNeeded = 1000;
    $scope.movesGiven = 0;
    $scope.seed = function () {
      var t = [];
      var event = 'mousemove';
      function w(e) {
        $scope.$apply(function () {
          $scope.movesGiven = t.length;
          t.push([e.pageX, e.pageY, +new Date()]);
          if ($scope.movesGiven < $scope.movesNeeded) { return; }
          document.removeEventListener(event, w);
          Math.seedrandom(t, { entropy: true });
          that.seeded = true;
          $state.go('singleWallet');
        });
      }
      document.addEventListener(event, w);
      that.seeded = false;
      $scope.movesGiven = 0;
    };
    $scope.seed();
};
