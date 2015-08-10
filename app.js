angular.module('paperwallet', ['monospaced.qrcode'])
  .controller('PaperWallet', function ($scope) {
    $scope.seeded = false;
    $scope.movesNeeded = 1000;
    $scope.movesGiven = 0;
    $scope.seed = function () {
      var t = [];
      var event = 'mousemove';
      function w(e) {
        $scope.$apply(function () {
          $scope.movesGiven = t.length;
          t.push([e.pageX, e.pageY, +new Date]);
          if ($scope.movesGiven < $scope.movesNeeded) { return; }
          document.removeEventListener(event, w);
          Math.seedrandom(t, { entropy: true });
          $scope.seeded = true;
          $scope.generateWallet();
        });
      }
      document.addEventListener(event, w);
      $scope.seeded = false;
      $scope.movesGiven = 0;
    };
    $scope.seed();

    $scope.generateWallet = function () {
      var accounts = new Accounts();
        var account = accounts.new();
        $scope.address = account.address;
        $scope.private = account.private;
    };
    $scope.base58 = function (hex) {
      if (!hex) return;
      var intArray = [];
      for (var i=0; i < hex.length; i+=2) {
        intArray.push(parseInt(hex[i]+hex[i+1], 16));
      }
      return Base58.encode(intArray);
    };
    $scope.obfuscate = function (str) {
      if (!str) return;
      return str.replace(/./g, '*');
    };
  });
