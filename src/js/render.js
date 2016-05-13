/*jshint esnext: true */
(function () {
    "use strict";

    // modules
    const data = require('./data.min.js');

    // database function
    const render = (function () {

      const machines = function machines(callback){
        data.fetch_machines(function(machine_data){
          let machine_html = "";

          machine_data.forEach(function(machine){
            machine_html += '<li class="machine" data-id="' + machine.id + '">\
              <div class="data">\
                <div class="meta">\
                  <span class="title"> ' + machine.title + ' </span>\
                  <div>\
                    <span class="user">' + machine.user + '</span>\
                    <span class="ip">' + machine.ip + '</span>\
                  </div>\
                </div>\
              </div>\
              <div class="functions">\
                <div class="gear"> <img src="../public/img/cog.png"> </div>\
                <div class="edit"> <img src="../public/img/edit.png"> </div>\
                <div class="trash"> <img src="../public/img/trash.png"> </div>\
              </div>\
            </li>'
          });

          callback(machine_html);
        });
      };

      return { machines, };
    }());

    module.exports = render;
}());
