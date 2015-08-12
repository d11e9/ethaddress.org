EthPW.controllers.singleWallet = function ($scope) {
    $scope.accounts = new Accounts();
    $scope.generateWallet = function () {
      var account = $scope.usePassword ? $scope.accounts.new($scope.password) : $scope.accounts.new();
      $scope.address = account.address;
      $scope.private = account.private;
      $scope.encrypted = account.encrypted;
      $scope.accounts.clear();
    };
    $scope.print = function () {window.print();};
    $scope.base58 = function (hex) {
      if (!hex || (Number.isNaN(parseInt(hex), 16))) return;
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
    $scope.exportKey = function () {
      saveAs(new Blob([$scope.private], {type: "text/plain;charset=utf-8"}), $scope.address + ".key");
    };
    $scope.generateWallet();
};
