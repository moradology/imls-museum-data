
(function() {
    'use strict';

    /**
     * Controller for the imls app home view
     */
    /* ngInject */
    function HomeController($log, $q, Geocoder) {

        var ctl = this;

        initialize();

        function initialize() {
            ctl.error = false;
            ctl.mapExpanded = false;

            ctl.search = search; 
            ctl.suggest = suggest;
        }

        function suggest(item) {
            var dfd = $q.defer();
            ctl.error = false;
            Geocoder.suggest(item).then(function(results) {
                if (!results.length) {
                    ctl.error = true;
                }
                dfd.resolve(results);
            }).catch(function (error) {
                ctl.error = true;
                dfd.reject(error);
            });
            return dfd.promise;
        }

        function search(selection) {
            $log.debug(selection);
            Geocoder.search(selection.text, selection.magicKey)
            .then(function (result) {
                if (result.length) {
                    $log.debug(result);
                } else {
                    ctl.error = true;
                }
            }).catch(function (error) {
                ctl.error = true;
                $log.error(error);
            });
        }
    }

    angular.module('imls.views.home')
    .controller('HomeController', HomeController);
})();
