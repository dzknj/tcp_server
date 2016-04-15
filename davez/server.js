const fs = require('fs');
const net = require('net');

var count = 0;

function counter () {
  count++;
  var time = new Date().toString().slice(16,24);
  return time;
};

function FileCreateObject() {
  this.fileName = counter();
};

const server = module.exports = net.createServer((socket) => {
  var filetosend = counter();
  var writeOut = fs.createWriteStream(__dirname + '/writtenfiles/' + filetosend +'.txt');
  socket.pipe(writeOut);
  socket.pipe(process.stdout);
  socket.on('data',function (newFile) {
    socket.write(filetosend);
  });
});
server.listen(3000, () => {
  process.stdout.write('server up on 3000\n');
});
