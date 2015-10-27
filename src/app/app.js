require( 'angular-animate');
require( 'angular-touch' );
require( 'angular-ui-router' );
require( 'angular-ui-router-title' );
require( 'angular-dropdowns' );
require( 'angular-loading-bar' );
require( 'angularjs-socialshare' );
require( 'angularytics' );
require( 'satellizer' );

require( './calculator/calculator.module' );
require( './calculator/calculator.service' );
require( './calculator/call-me.controller' );
require( './calculator/confirm-order.controller' );
require( './calculator/municipality.service' );
require( './calculator/options.service' );
require( './calculator/options.controller' );
require( './calculator/order.controller' );
require( './calculator/order.service' );
require( './calculator/order-complete.controller' );
require( './calculator/result.controller' );
require( './calculator/results.controller' );

require( './backoffice/auth.controller' );
require( './backoffice/backoffice.controller' );
require( './backoffice/backoffice-dashboard.controller' );

require( './filters/filters.module' );
require( './filters/big-number.filter' );
require( './filters/deal-type.filter' );
require( './filters/nok-format.filter' );
require( './filters/yes-no.filter' );

require( './widgets/widgets.module' );
require( './widgets/postal-input.directive' );
require( './widgets/ripple.directive' );
require( './widgets/slider.directive' );
require( './widgets/splash-page.directive' );
require( './widgets/sticky-footer.directive' );
require( './widgets/suffix-input.directive' );
require( './widgets/switch.directive' );
require( './widgets/tooltip.directive' );

( function ( angular, undefined ) {

    'use strict';

    if ( ! angular ) return;

    angular
        .module( 'stromvalget', [
            'app.calculator',
            'app.filters',
            'app.widgets',
            'ui.router',
            'ng',
            'ui.router.title',
            'ngDropdowns',
            'ngAnimate',
            'ngTouch',
            'angular-loading-bar',
            '720kb.socialshare',
            'angularytics',
            'satellizer'
        ] )
        .value( 'apiUrl', 'https://api.stromvalget.no/api' )
        .config( [ 'cfpLoadingBarProvider', 'AngularyticsProvider', '$authProvider', function ( cfpLoadingBarProvider, AngularyticsProvider, $authProvider ) {
            $authProvider.loginUrl = 'https://api.stromvalget.no/auth/login';

            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.latencyThreshold = 300;
            cfpLoadingBarProvider.loadingBarTemplate = '<div class="LoadingBar"><div class="LoadingBar-bar"></div></div>';

            AngularyticsProvider.setEventHandlers( [ 'Console', 'Google' ] );
        } ] )
        .run( ['$rootScope', 'Angularytics', function( $rootScope, Angularytics ) {
            $rootScope.navigationOpen = false;
            $rootScope.toggleNavigation = function() {
                $rootScope.navigationOpen = ! $rootScope.navigationOpen;
            };

            Angularytics.init();
        } ] );

})( angular );

require( './routes' );