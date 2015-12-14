
// YOUR CODE HERE:

//Objective: post and update messages to the chatter box server.

//find a way to retrieve the meassage from the server and post them to the DOM.
  //seperate: username, message, roomname (but within teh same message)

//find a way to post created messages by user to the DOM.
var app = {};

app.init = function(){
};

var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

app.send = function(message){

  $.ajax({

    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      //$('#main').append(data);
      //console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //'https://api.parse.com/1/classes/chatterbox'
    url: undefined,
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      $('#main').append(data.results[0].username)
      $('#main').append(data.results[0].text);
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  // $('.message').append('hello');
  });

};

app.addMessage = function(message){
  var $message = $('<div class="message">'); 
  $('#main').append($message);
  $('#main').append('hello');
};

app.clearMessages = function(message){
  //var $message = $('<div class="message"')
  $('.message').remove();
}

app.addRoom = function(roomname){
  $('#main').append(roomname);
};

$(document).ready(function(){
 });





