/*jshint esnext: true */
(function () {
    "use strict";

    // modules
    const data = require('./data.min.js');

    // database function
    const render = (function () {

      const machines = function machines(){
        data.fetch_machines();
      };

      return { machines, };
    }());

    module.exports = render;
}());
