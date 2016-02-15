angular
  .module('giphyMessenger')
  .controller('messagesController', messagesController);

messagesController.$inject = ['$websocket'];
function messagesController($websocket){

  var self = this

  var dataStream = $websocket();

  var collection = [];

  dataStream.onMessage(function(message) {
    collection.push(JSON.parse(message.data));
  });

  var methods = {
    collection: collection,
    get: function() {
      dataStream.send(JSON.stringify({ action: 'get' }));
    }
  };

  self.MyData = methods

}
