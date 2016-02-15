angular
  .module('giphyMessenger')
  .controller('messagesController', messagesController);

messagesController.$inject = ['$scope']
function messagesController($scope){

  var self = this

  var socket = io()

  self.all = []
  self.message = ''
  self.sendMessage = sendMessage

  socket.on('chat message', function(msg){
    self.all.push(msg)
    $scope.$apply()
  });


  function sendMessage() {
     socket.emit('chat message', self.message)
     self.message = ''
     console.log('test')
  }


}
