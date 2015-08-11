EthPW.app = angular
  .module('paperwallet', ['monospaced.qrcode', 'ui.router'])
  .controller('Seeder', EthPW.controllers.seeding);

EthPW.app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/404');
    $stateProvider
        .state('singleWallet', {
            url: '/', templateUrl: 'partials/singleWallet.html',
            controller: EthPW.controllers.singleWallet
        })
        .state('bulkWallets', {
            url: '/bulkWallets', templateUrl: 'partials/bulkWallets.html',
            controller: EthPW.controllers.bulkWallets
        })
        .state('404', {url: '/404', templateUrl: 'partials/404.html'});
});
