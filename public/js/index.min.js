(function(){
  // requires
  const render = require('./render.min.js');
  const data = require('./data.min.js');


  // functions
  const search = function search(searchstring) {
    // clear it all if empty
    if (searchstring == "") {
      $('.machines .machine').show();
    } else {
      // what if its not empty
      let ids = []


      data.fetch_machines(function(object){
        // newsletter loop
        for (let i = 0; i < object.length; i++) {
          // setup query
          let querys = [object[i].title, object[i].ip,
                        object[i].user];

          let querystring = "";

          // concat query
          for (let x = 0; x < querys.length; x++) {
            if (querys[x] !== null){
              querystring = querystring + querys[x];
            }
          }

          //standarze data
          searchstring = searchstring.replace(/\s+/g, '').toLowerCase()
          querystring = querystring.replace(/\s+/g, '').toLowerCase();

          // search tag string
          if (querystring.indexOf(searchstring) !== -1 ) {
            ids.push(object[i].id);
          }
        }

        //filter newsletters
        $( ".machines .machine" ).each(function( index ) {
          let id = parseInt($(this).attr('data-id'));
          if ($.inArray(id, ids) === -1) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
      });

    }
  };


  // init/listeners
  const init = function init(){
    // initial render of machines
    render.machines(function(machine_html){
      $('.machines').prepend(machine_html);
    });


    // listeners
    // settings cog
    $("body").on('click', '.machine .functions .gear', function (event){
      // prevent
      event.stopPropagation();
      // select parent element
      let el = $(this).parent().parent();

      // toggle classes
      if (el.hasClass('editing')){
        el.removeClass('editing');
        el.children('.functions').removeClass('visible');
        $('html').off();
      } else {
        el.addClass('editing');
        el.children('.functions').addClass('visible');

        $('html').on('click', function() {
          el.removeClass('editing');
          el.children('.functions').removeClass('visible');
          $(this).off();
        });
      }

    });

    // edit
    $("body").on('click', '.machine .functions .edit', function (event){
      // no bubbles
      event.stopPropagation();

      // turn off gobal listener
      $('html').off();

      // select parent element
      let el = $(this).parent().parent();

      // add editing
      $('.add_machine_dialog').addClass('edit');

      //set data-id
      $('.add_machine_dialog').attr('data-id', el.attr('data-id'));

      // set button text
      $('.add_machine_dialog form input[type="submit"]').val('Update');

      // reset inputs
      $('.add_machine_dialog form input[type=text]').val('');

      data.fetch_machine(el.attr('data-id'), function(machine){
        // set inputs
        $('.add_machine_dialog .title').val(machine.title);
        $('.add_machine_dialog .ip').val(machine.ip);
        $('.add_machine_dialog .user').val(machine.user);

        // show
        $('.add_machine_dialog').toggleClass('visible');
      });

    });

    // trash
    $("body").on('click', '.machine .functions .trash', function (event){
      // no bubbles
      event.stopPropagation();

      // turn off gobal listener
      $('html').off();

      // select parent element
      let el = $(this).parent().parent();
      console.log(el.attr('data-id'));
      data.remove_machine(el.attr('data-id'), function(){
        el.remove();
      });
    });

    // show machine dialog - add
    $("body").on('click', '.search_wrapper .add_icon, .add_machine_dialog .back_button img', function (event){
      //remove editing
      $('.add_machine_dialog').removeClass('edit');

      //reset data-id
      $('.add_machine_dialog').attr('data-id', '');

      // reset inputs
      $('.add_machine_dialog form input[type=text]').val('');

      // set button text
      $('.add_machine_dialog form input[type="submit"]').val('Create');

      // show
      $('.add_machine_dialog').toggleClass('visible');
    });

    // add form submit
    $("body").on('submit', '.add_machine_dialog form', function (event){
      event.preventDefault();

      // set data
      let title = $(this).children('.title').val();
      let ip = $(this).children('.ip').val();
      let user = $(this).children('.user').val();

      // add/edit machine
      if ($('.add_machine_dialog').hasClass('edit')){
        // editing
        console.log($(this).parent().attr("data-id"));
        data.update_machine($(this).parent().attr("data-id"), title, ip, user);
      } else {
        // creating new
        data.add_machine(title, ip, user);
      }

      // render machines
      render.machines(function(machine_html){
        $('.machines').html('');
        $('.machines').prepend(machine_html);
      });

      $('.add_machine_dialog').removeClass('visible');
    });

    // search
    $("body").on('keyup change', '.search', function (event){
      search($(this).val(), this);
    });

  }; init();

}());
