angular
  .module('giphyMessenger')
  .controller('messagesController', messagesController);

messagesController.$inject = ['$scope', '$http']
function messagesController($scope, $http){

  var self = this

  var socket = io()

  var date = String(Date.now())

  var shortDate = date.substr(date.length - 4, date.length)

  self.all = []
  self.message = ''
  self.sendMessage = sendMessage
  self.user = 'Guest' + shortDate

  $http.get('/history.json').success(function(data) {
      self.all = data
  })

  socket.on('chat message', function(msg){
    if (self.all.length > 300) self.all.shift()
    self.all.push(msg)
    $scope.$apply()

    $('#scrollingdiv').animate({scrollTop: $("#childscrollingdiv").height()}, 800, 'swing');
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

  window.setTimeout(function() {
    $('#scrollingdiv').animate({scrollTop: $("#childscrollingdiv").height()}, 800, 'swing');
  }, 1000)

}