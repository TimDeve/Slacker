var giphy = require('giphy-api-without-credentials')();
var _ = require('lodash')

module.exports = function(io) {
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){

      if (msg.substr(msg.length - 3, msg.length) === "gif") {
        obj = {error: false, data: msg}
        io.emit('chat message', obj);
      }
      else {
        giphy.search(msg, function(err, res) {
          var obj

          if (res.data.length === 0) {
            obj = {error: true, data: "There is no result for " + msg}
            io.emit('chat message', obj);
          }
          else {
            var pick = _.random(res.data.length - 1)
            var id = res.data[pick].id
            var url = "https://media.giphy.com/media/" + id + "/giphy.gif"
            obj = {error: false, data: url}
            io.emit('chat message', obj);
          }

        });
      }
    });
  });
}
