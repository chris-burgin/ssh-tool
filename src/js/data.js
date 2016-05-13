/*jshint esnext: true */
(function () {
    "use strict";

    // database function
    const data = (function () {

      const save_machine = function machines(){
        console.log('saving machine');
      };

      const fetch_machines = function fetch_machines(){
        console.log('fetching all machines');
      };

      return { save_machine, fetch_machines };
    }());

    module.exports = data;
}());
