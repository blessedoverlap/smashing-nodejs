// Module dependencies
var net = require('net');

// Keep track of connections
var count = 0
  , users = {};

// Create server
var server = net.createServer(function (conn) {
  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
  + '\n > ' + count + ' other people are connected at this time.'
  + '\n > please write your name and press enter: '
  );
  count++;

  conn.setEncoding('utf-8');
  var nickname;

  conn.on('data', function(data){
    // Remove the "enter" character
    data = data.replace('\r\n', '');

    // the first piece of data you expect is the nickname
    if (!nickname) {
      if (users[data]) {
        conn.write('\033[93m> nickname already in use. try again:\033[39m ');
        return;
      } else {
        nickname = data;
        users[nickname] = conn;

        for (var i in users) {
          users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n');
        }
      }
    } else {
      // otherwise you consider it a chat message
      for (var i in users) {
        if (i != nickname) {
          users[i].write('\033[96m > ' + nickname + ':\033[39m ' + data + '\n');
        }
      }
    }

    console.log(data);
  });

  conn.on('close', function () {
    count--;
    delete users[nickname];
  });
});

// Listen
server.listen(3000, function () {
  console.log('\033[96m   server listening on *:3000\033[39m');
});
