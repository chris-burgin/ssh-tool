var menubar = require('menubar')

var mb = menubar({
  index : 'file://' + __dirname + '/templates/index.html'
});

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
