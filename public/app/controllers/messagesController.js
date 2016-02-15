angular
  .module('giphyMessenger')
  .controller('messagesController', messagesController);

messagesController.$inject = ['$scope']
function messagesController($scope){

  var self = this

  var socket = io()

  var date = String(Date.now())

  var shortDate = date.substr(date.length - 4, date.length)

  self.all = []
  self.message = ''
  self.sendMessage = sendMessage
  self.user = 'Guest' + shortDate

  socket.on('chat message', function(msg){
    self.all.push(msg)
    $scope.$apply()
  });


  function sendMessage() {
    var substr = self.message.substr(0, 6)

    if ( substr === "/nick ") {
      self.user = self.message.substr(6, self.message.length)
      self.message = ''
    }
    else {
      socket.emit('chat message', {user: self.user, message: self.message})
      self.message = ''
    }
  }


}