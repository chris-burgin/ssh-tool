(function(){
  // requires
  const render = require('./render.min.js');
  const data = require('./data.min.js');

  // function


  // init/listeners
  const init = function init(){
    // initial render of machines
    //data.add_machine('Title1', '125.12.32.2', 'root');

    render.machines(function(machine_html){
      $('.machines').prepend(machine_html);
    });


    // listeners
    // settings cog
    $("body").on('click', '.machine .functions .gear', function (event){
      // select parent element
      let el = $(this).parent().parent();

      // toggle everything open or closed
      el.toggleClass('editing');
      el.children('.functions').toggleClass('visible');
    });

    // edit
    $("body").on('click', '.machine .functions .edit', function (event){
      // select parent element
      let el = $(this).parent().parent();

      // toggle everything open or closed
      console.log('editing');
    });

    // trash
    $("body").on('click', '.machine .functions .trash', function (event){
      // select parent element
      let el = $(this).parent().parent();

      // toggle everything open or closed
      console.log('trash');
    });

    // show machine dialog
    $("body").on('click', '.search_wrapper .add_icon, .add_machine_dialog .back_button img', function (event){
      $('.add_machine_dialog').toggleClass('visible');
    });

    // add form submit
    $("body").on('submit', '.add_machine_dialog form', function (event){
      event.preventDefault();

      // set data
      let title = $(this).children('.title').val();
      let ip = $(this).children('.ip').val();
      let user = $(this).children('.user').val();

      // add machine
      data.add_machine(title, ip, user);

      // render machines
      render.machines(function(machine_html){
        $('.machines').html('');
        $('.machines').prepend(machine_html);
      });

      $('.add_machine_dialog').removeClass('visible');
    });
  }; init();

}());
