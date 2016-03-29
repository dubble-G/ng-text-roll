(function() {

  'use strict';

  /**
   * @ngdoc component
   * @name ui.ng-text-roll.directive:ngTextRoll
   * @description
   * # ngTextRoll
   */

  angular.module('ui.ngTextRoll', [])
    .factory('ngTextRollSvc', function($timeout, $filter) {
      var svc = {};

      // local vars
      svc.current = 0;
      svc.render = [{
        style: {}
      }, {
        style: {}
      }];
      // Constants
      svc.trans = 'top 0.5s ease-in-out';
      svc.zero = '0';

      svc.init = function(height, target, currency) {
        svc.height = height;
        svc.currency = currency;
        svc.intHeight = parseInt(svc.height);
        svc.unitHeight = svc.height.replace(svc.intHeight, '');
        svc.offset = svc.intHeight * 0.17;
        svc.topAbove = ((svc.intHeight + svc.offset) * -1) + svc.unitHeight;
        svc.topBelow = (svc.intHeight + svc.offset) + svc.unitHeight;
        // set initial render
        svc.render[0].style = {
          'top': svc.zero
        };
        svc.render[0].target = svc.formatCurrency(target);
      };

      svc.formatCurrency = function(target) {
        return svc.currency ? $filter('currency')(target) : target;
      };

      svc.next = function() {
        svc.current = (svc.current === 0 ? 1 : 0);
      };

      svc.animSetup = function(oldVal, newVal, pos) {
        svc.render[svc.current].style['-webkit-transition'] = undefined;
        svc.render[svc.current].style['-moz-transition'] = undefined;
        svc.render[svc.current].style.transition = undefined;
        svc.render[svc.current].style.top = pos ? svc.topBelow : svc.topAbove;
        svc.render[svc.current].target = svc.formatCurrency(newVal);

        var inx = svc.current === 0 ? 1 : 0;
        svc.render[inx].style['-webkit-transition'] = undefined;
        svc.render[inx].style['-moz-transition'] = undefined;
        svc.render[inx].style.transition = undefined;
        svc.render[inx].style.top = svc.zero;
        svc.render[inx].target = svc.formatCurrency(oldVal);
      };

      svc.animate = function(pos) {
        svc.render[svc.current].style.top = svc.zero;
        svc.render[svc.current].style['-webkit-transition'] = svc.trans;
        svc.render[svc.current].style['-moz-transition'] = svc.trans;
        svc.render[svc.current].style.transition = svc.trans;

        var inx = svc.current === 0 ? 1 : 0;
        svc.render[inx].style['-webkit-transition'] = svc.trans;
        svc.render[inx].style['-moz-transition'] = svc.trans;
        svc.render[inx].style.transition = svc.trans;
        svc.render[inx].style.top = pos ? svc.topAbove : svc.topBelow;
      };

      svc.runAnim = function(oldVal, newVal) {
        var pos = newVal > oldVal;
        svc.next();
        svc.animSetup(oldVal, newVal, pos);
        svc.t = $timeout(svc.animate, 25, true, pos);
      };

      svc.clearTimeout = function() { // clean up timer
        $timeout.cancel(svc.t);
      };

      return svc;
    })
    .component('ngTextRoll', {
      templateUrl: 'app/components/ngTextRoll/ngtextroll.html',
      bindings: {
        target: '=',
        currency: '<',
        height: '<'
      },
      controller: function($timeout, ngTextRollSvc) {
        var ctrl = this;

        ctrl.$onInit = function() {
          ctrl.svc = ngTextRollSvc; // simplify bindings
          ctrl.svc.init(ctrl.height, ctrl.target, this.currency);
        };

        ctrl.$onDestroy = function() { // clean up timer
          ctrl.svc.clearTimeout();
        };

      }
    });

  // template:js
  // endinject

})();
