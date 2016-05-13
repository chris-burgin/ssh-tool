/*jshint esnext: true */
(function () {
    "use strict";

    // include data
    var machines = require('../data/machines.json');

    // database function
    const data = (function () {

      const save_machine = function machines(){
        console.log('saving machine');
      };

      const fetch_machines = function fetch_machines(callback){
        callback(machines);
      };

      return { save_machine, fetch_machines };
    }());

    module.exports = data;
}());
