( function ( angular, undefined ) {

    'use strict';

    if ( ! angular ) return;

    angular
        .module( 'stromvalget' )
        .config( [ '$urlRouterProvider', '$stateProvider', '$locationProvider', Router ] )
        .run( [ '$anchorScroll', '$window', '$state', '$stateParams', '$rootScope', autoScroll ] );

    function Router( $urlRouterProvider, $stateProvider, $locationProvider ) {
        $urlRouterProvider.otherwise( '/' );

        $stateProvider
            .state( 'dinsideMobileRedirect', {
                url: '/index.jsp?:extraStuff',
                controller: function() {
                    window.location.href = 'http://stromvalget.no/Dinside/index.jsf';
                }
            })
            .state( 'home', {
                url: '/',
                resolve: {
                    $title: function() { return 'Strømvalget - Sammenlign strømpriser og bytt strømleverandør med vår strømkalkulator'; }
                }
            } )
            .state( 'options', {
                url: '/alternativer',
                templateUrl: 'views/options.html',
                controller: 'OptionsController as options',
                resolve: {
                    $title: function() { return 'Alternativer - Strømvalget'; }
                }
            } )
            .state( 'results', {
                url: '/resultat',
                templateUrl: 'views/results.html',
                controller: 'ResultsController as results',
                resolve: {
                    $title: function() { return 'Resultat - Strømvalget'; }
                }
            } )
            .state( 'moreInfo', {
                url: '/resultat/:id',
                templateUrl: 'views/more-info.html',
                controller: 'ResultController as result',
                resolve: {
                    result: [ 'Calculator', '$stateParams', function ( Calculator, $stateParams ) {
                        return Calculator.getResult( $stateParams.id );
                    } ],
                    $title: [ 'result', function ( result ) {
                        return result.organizationName + ', ' + result.productName + ' - Strømvalget';
                    } ]
                }
            } )
            .state( 'order', {
                url: '/resultat/:id/bestill',
                templateUrl: 'views/order.html',
                controller: 'OrderController as order',
                resolve: {
                    $title: function() { return 'Bestill - Strømvalget'; }
                }
            } )
            .state( 'confirmOrder', {
                url: '/bestilling/:id/:secret',
                templateUrl: 'views/confirm-order.html',
                controller: 'ConfirmOrderController as confirmOrder',
                resolve: {
                    $title: function() { return 'Måleravlesning - Strømvalget'; }
                }
            } )
            .state( 'orderComplete', {
                url: '/bestilling/:id/:secret/bekreftelse',
                templateUrl: 'views/order-complete.html',
                controller: 'OrderCompleteController as orderComplete',
                resolve: {
                    $title: function() { return 'Ordrebekreftelse - Strømvalget'; }
                }
            } )
            .state( 'tips', {
                url: '/sparetips',
                templateUrl: 'views/tips.html',
                resolve: {
                    $title: function() { return 'Sparetips - Strømvalget'; }
                }
            } )
            .state( 'about', {
                url: '/om-stromvalget',
                templateUrl: 'views/about.html',
                resolve: {
                    $title: function() { return 'Om Strømvalget - Strømvalget'; }
                }
            } )
            .state( 'faq', {
                url: '/sporsmal-og-svar',
                templateUrl: 'views/faq.html',
                resolve: {
                    $title: function() { return 'Spørsmål og svar - Strømvalget'; }
                }
            } )
            .state( 'backoffice', {
                abstract: true,
                url: '/backoffice',
                templateUrl: 'views/backoffice/backoffice.html',
                controller: 'BackofficeController as backoffice'
            } )
            .state( 'backoffice.login', {
                url: '/innlogging',
                templateUrl: 'views/backoffice/login.html',
                controller: 'AuthController as auth',
                resolve: {
                    $title: function() { return 'Innlogging - Backoffice - Strømvalget'; }
                }
            } )
            .state( 'backoffice.dashboard', {
                url: '',
                templateUrl: 'views/backoffice/dashboard.html',
                controller: 'BackofficeDashboardController as dashboard',
                resolve: {
                    $title: function() { return 'Dashboard - Backoffice - Strømvalget'; }
                }
            } )
            .state( 'backoffice.orders', {
                url: '/bestillinger',
                templateUrl: 'views/backoffice/orders.html',
                controller: 'BackofficeOrdersController as orders',
                resolve: {
                    $title: function() { return 'Bestillinger - Backoffice - Strømvalget'; }
                }
            } )
            .state( 'backoffice.order', {
                url: '/bestilling/:id',
                templateUrl: 'views/backoffice/order.html',
                controller: 'BackofficeOrderController as order',
                resolve: {
                    $title: function() { return 'Bestilling - Backoffice - Strømvalget'; }
                }
            } );

        // Use HTML5 location API
        $locationProvider.html5Mode( true );
    }

    /**
     * Scroll to the top when the URL address changes, unless you use
     * the back or forward button to navigate in the browser.
     *
     * @param $anchorScroll
     * @param $window
     */
    function autoScroll( $anchorScroll, $window, $state, $stateParams, $rootScope ) {
        var original = $window.window.history[ 'pushState' ];
        $window.window.history[ 'pushState' ] = function () {
            original.apply( this, Array.prototype.slice.call( arguments ) );
            $anchorScroll();
        }

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.redirecting = false;
    }

})( angular );
