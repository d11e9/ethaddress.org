EthPW.controllers.seeding = function ($scope, $state) {
    var that = this;
    that.seeded = false;
    $scope.movesNeeded = 2048;
    $scope.movesGiven = 0;
    that.seed = function () {
      var entropy = [];
      var event = 'mousemove';
      var setEntropySource = function (eventName, parseEvent) {
        function w(e) {
          $scope.$apply(function () {
            entropy.push(parseEvent(e));
            $scope.movesGiven = entropy.length;
            if ($scope.movesGiven < $scope.movesNeeded) { return; }
            window.removeEventListener(eventName, w);
            Math.seedrandom(entropy, { entropy: true });
            that.seeded = true;
            $state.go('singleWallet');
          });
        }
        window.addEventListener(eventName, w);
      };

      setEntropySource('mousemove', function (e) {
        return [e.pageX, e.pageY, +new Date()];
      });

      setEntropySource('touchstart', function (e) {
        var touch = e.changedTouches[0];
        return [touch.pageX, touch.pageY, +new Date()];
      });

      setEntropySource('touchmove', function (e) {
        var touch = e.changedTouches[0];
        return [touch.pageX, touch.pageY, +new Date()];
      });

      setEntropySource('touchend', function (e) {
        var touch = e.changedTouches[0];
        return [touch.pageX, touch.pageY, +new Date()];
      });

      setEntropySource('devicemotion', function (e) {
        console.log("moved");
        var acc = e.accelerationIncludingGravity ? e.accelerationIncludingGravity : e.acceleration;
        return [acc.x, acc.x, acc.z, +new Date()];
      });

      that.seeded = false;
      $scope.movesGiven = 0;
    };
    that.seed();
};
