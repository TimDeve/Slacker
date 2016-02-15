var giphy = require('giphy-api-without-credentials')();
var _ = require('lodash')
var jsonfile = require('jsonfile')
var util = require('util')
var path = require('path')
var fs = require('fs')

module.exports = function(io) {
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){

      var historyFile = __dirname + "/../public/history.json"
      var history = []

      if (fs.existsSync(historyFile)) {
        history = jsonfile.readFileSync(historyFile)
        if (history.length > 1000) history = []
      }

      function writeHistory(newObj, newHistory) {
        newHistory.push(newObj)
        jsonfile.writeFile(historyFile, newHistory, function (err) {
          console.error(err)
        })
      }

      var obj = {}

      if (msg.message.substr(msg.message.length - 4, msg.message.length) === ".gif") {
        obj = {
          user: msg.user,
          error: false,
          data: msg.message,
          search: "Typed it's own gif"
        }
        writeHistory(obj, history)
        io.emit('chat message', obj);
      }
      else {
        giphy.search(msg.message, function(err, res) {

          if (res.data.length === 0) {
            obj = {
              user: msg.user,
              error: true,
              data: "There was no result",
              search: "searched for: " + msg.message
            }
            writeHistory(obj, history)
            io.emit('chat message', obj);
          }
          else {
            var pick = _.random(res.data.length - 1)
            var id = res.data[pick].id
            var url = "https://media.giphy.com/media/" + id + "/giphy.gif"
            obj = {
              user: msg.user,
              error: false,
              data: url,
              search: "searched for: " + msg.message
            }
            writeHistory(obj, history)
            io.emit('chat message', obj);
          }

        });
      }

    });
  });
}
