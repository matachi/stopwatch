'use strict';

app.factory('animate', function($window, $rootScope) {
  var requestAnimationFrame = $window.requestAnimationFrame ||
  $window.mozRequestAnimationFrame ||
  $window.msRequestAnimationFrame ||
  $window.webkitRequestAnimationFrame;


  return function(tick) {
    requestAnimationFrame(function() {
      $rootScope.$apply(tick);
    });
  };
});
