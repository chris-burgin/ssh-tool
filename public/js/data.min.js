/*jshint esnext: true */
(function () {
    "use strict";

    // include data
    let machines = require('../data/machines.json');
    let fs = require('fs');

    // database function
    const data = (function () {

      const add_machine = function save_machine(title, ip, user){
        // append to machines
        machines.push({"id": 0, "title" : title, "ip" : ip, "user": user});

        // stringify
        let string = JSON.stringify(machines);

        //write
        fs.writeFile('public/data/machines.json',string,function(err) { console.log(err);});
      };

      const fetch_machines = function fetch_machines(callback){
        callback(machines);
      };

      return { add_machine, fetch_machines };
    }());

    module.exports = data;
}());
