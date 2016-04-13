var net = require('net');
var fs = require('fs');
// var through = require('through');

var count = 0;

function counter () {
  var time = new Date().toString().slice(16,24);
  count++;
  return 'Req-' + count + '--' + time;
};

var server = net.createServer((socket) => {
  // var concatenatedDataStream =
  socket.on('data', (data) => {
    var today = new Date();
    // socket.write('HTTP/1.1 200');
    fs.writeFile(__dirname + '/writtenfiles/' + counter() +'.txt', data, (err) => {
      if (err) throw err;
      console.log('file written');
    });
  });
  socket.on('close', () => {
    socket.end();
  });

});


server.listen(8000, () => {
  console.log('server started on 8000');
});
