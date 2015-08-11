EthPW.controllers.bulkWallets = function ($scope) {
    var that = this;
    $scope.wallets = [];
    $scope.accounts = new Accounts();
    that.generateWallet = function () {
      var account = $scope.usePassword ? $scope.accounts.new($scope.password) : $scope.accounts.new();
      $scope.address = account.address;
      $scope.private = account.private;
      $scope.encrypted = account.encrypted;
      $scope.accounts.clear();
    };

    $scope.generateWallets = function () {
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
    $scope.generateWallets();
};
