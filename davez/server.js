const fs = require('fs');
const net = require('net');

var count = 0;

function counter () {
  var time = new Date().toString().slice(16,24);
  count++;
  return 'Req-' + count + '--' + time;
};

const server = net.createServer((socket) => {
  var writeOut = fs.createWriteStream(__dirname + '/writtenfiles/' + counter() +'.txt');
  socket.pipe(writeOut);
});
server.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
  process.stdout.write('booyah mutha fucka!!!\n');
});
