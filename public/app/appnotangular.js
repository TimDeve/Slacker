var socket = io();

$(document).ready(function() {

  $('#messageForm').submit(function(event){
    event.preventDefault()
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    var el
    if (msg.error) {
      el = "<li>" + msg.data + "</li>"
      $('#messages').append(el);
    }
    else {
      el = "<li><img src='" + msg.data + "'></li>"
      $('#messages').append(el);
    }
  });

})