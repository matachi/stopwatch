'use strict';

// Code for the loop is based on: http://jsfiddle.net/IgorMinar/TSAag/

function animator(clock, animate) {
  (function tick() {
    if (clock.running) {
      clock.elapsed.dates[clock.elapsed.dates.length - 1] = Date.now();

      var elapsed = 0;
      for (var i = 0; i < clock.elapsed.dates.length; i += 2) {
        elapsed += clock.elapsed.dates[i + 1] - clock.elapsed.dates[i];
      }

      var elapsed = new Date(elapsed);

      var mils = clock.addZeroes(elapsed.getUTCMilliseconds().toString(), 3);
      clock.elapsed.mils = mils[0];

      var secs = clock.addZeroes(elapsed.getUTCSeconds().toString(), 2);
      clock.elapsed.secs = secs;

      var mins = clock.addZeroes(elapsed.getUTCMinutes().toString(), 2);
      clock.elapsed.mins = mins;

      var hours = elapsed.getUTCHours().toString();
      clock.elapsed.hours = hours;

      animate(tick);
    }
  })();
}

app.controller('StopwatchCtrl', function($scope, animate) {
  /**
   * This clock object stores data about the times.
   */
  $scope.clock = {
    elapsed: {
      /**
       * Keep track of the starts, pauses and resumes. dates[0] is the start,
       * dates[1] is the first pause, dates[2] is the first resume, dates[3] is
       * the second pause, etc. If dates[3] is the last element in the array
       * and the clock is running, then this will be ticking up until the clock
       * is paused again. When the clock is resumed two additional elements
       * will be added - the pause and the next resume that is ticking up.
       */
      dates: [],
      /**
       * The following variables are for displaying the cumulative time.
       */
      hours: "0",
      mins: "00",
      secs: "00",
      mils: "0"
    },
    laps: [],
    /**
     * If the clock is ticking.
     */
    running: false,
    /**
     * Method for easily prepend zeroes to a number.
     */
    addZeroes: function(number, length) {
      number = number.toString();
      for (var i = number.length; i < length; ++i) {
        number = "0" + number;
      }
      return number;
    },
    saveLap: function() {
      this.laps.push(this.generateLapString());
    },
    generateLapString: function() {
      var elapsed = 0;
      for (var i = 0; i < this.elapsed.dates.length; i += 2) {
        elapsed += this.elapsed.dates[i + 1] - this.elapsed.dates[i];
      }
      var elapsed = new Date(elapsed);
      return {
        name: "Lap " + (parseInt(this.laps.length) + 1),
        time: this.elapsed.hours + ":" +
              this.elapsed.mins + ":" +
              this.elapsed.secs + "." +
              this.addZeroes(elapsed.getUTCMilliseconds(), 3)
      };
    },
    reset: function() {
      this.elapsed = {
        dates: [], hours: "0", mins: "00", secs: "00", mils: "0"
      };
      this.laps = [];
    }
  };

  $scope.toggle = function() {
    $scope.clock.running = !$scope.clock.running;
    if ($scope.clock.running) {
      $scope.clock.elapsed.dates.push(Date.now(), Date.now());
      animator($scope.clock, animate);
    }
  };
});
