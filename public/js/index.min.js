(function(){
  // requires
  const render = require('./render.min.js');
  const data = require('./data.min.js');

  // function


  // init/listeners
  const init = function init(){
    // initial render of machines
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
  }; init();

}());
