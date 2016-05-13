/*jshint esnext: true */
(function () {
    "use strict";

    // include data
    let machines = require('../data/machines.json');
    let fs = require('fs');

    // database function
    const data = (function () {

      const add_machine = function save_machine(title, ip, user) {
        // append to machines
        nextid(function(id){
          machines.push({"id": id, "title" : title, "ip" : ip, "user": user});

          // stringify
          let string = JSON.stringify(machines);

          //write
          fs.writeFile('public/data/machines.json',string,function(err) { console.log(err);});
        });
      };

      const update_machine = function update_machine(id, title, ip, user) {
        // get machines object
        fetch_machines(function(object){
          // for loop here instead of forEach because we can use break
          for (var i = 0; i < object.length; i++) {
            if (object[i].id == id){

              // update local object
              object[i].title = title;
              object[i].ip = ip;
              object[i].user = user;

              //update machines object
              machines[i] = object[i];

              // stringify
              let string = JSON.stringify(machines);

              //write
              fs.writeFile('public/data/machines.json',string,function(err) { console.log(err);});

              break;
            };
          };
        });

      };

      const fetch_machines = function fetch_machines(callback){
        callback(machines);
      };

      const fetch_machine = function fetch_machine(id, callback){
        fetch_machines(function(object){
          // for loop here instead of forEach because we can use break
          for (var i = 0; i < object.length; i++) {
            if (object[i].id == id){
              callback(object[i]);
              break;
            };
          };
        });
      };

      const nextid = function nextid(callback){
        fetch_machines(function(object){
          // returns the last object id + 1
          callback(parseInt(machines[machines.length -1].id) + 1)
        });
      };

      return { add_machine, fetch_machines, fetch_machine, update_machine, };
    }());

    module.exports = data;
}());
