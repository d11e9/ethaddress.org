EthPW.controllers.bulkWallets = function ($scope) {
    var that = this;
    $scope.wallets = [];
    $scope.walletArt = "none";
    that.accounts = new Accounts();
    that.generateWallet = function () {
      return $scope.usePassword ? that.accounts.new($scope.password) : that.accounts.new();
    };
    $scope.print = function () {window.print();};

    $scope.generateWallets = function () {
        $scope.wallets = [];
        for (var i=0; i < parseInt($scope.numWallets); i+=1) {
            $scope.wallets.push(that.generateWallet());
            console.log(i);
        }
        that.accounts.clear();
    };

    $scope.base58 = function (hex) {
      if (!hex) return;
      var intArray = [];
      for (var i=0; i < hex.length; i+=2) {
        intArray.push(parseInt(hex[i]+hex[i+1], 16));
      }
      return Base58.encode(intArray);
    };
    $scope.exportKeys = function () {
      var zip = new JSZip();
      for (var i=0; i < $scope.wallets.length; i+=1) {
        zip.file($scope.wallets[i].address + ".key", $scope.wallets[i].private);
      }
      saveAs(zip.generate({type:"blob"}), "wallets.zip");
    };
    $scope.generateWallets();
};
