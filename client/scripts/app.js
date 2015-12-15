
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
    //url: 'https://api.parse.com/1/classes/chatterbox'
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
$(document).ready(function(){
  $('#main').append('<div id="chats">');
  $('#main').append('<div id="roomSelect>')
  //$('#chats').append('<div class="message"></div>');

  $('.username').on('click', function() {
    var userName = $('.username').val();
    app.addFriend(userName);
  });

 });

var $chat = $('#chats');
//console.log($chat);

app.addMessage = function(message){

    console.log($chat);
    var $message = $('<div id="chats">' + message + '</div>'); 
    $('#chats').append($message);


};

app.clearMessages = function(){
  //alert('in the clearing function')

    var $chat = $('#chats');
    //debugger
    $('#chats').remove();

};

app.addRoom = function(roomname){
  $('#roomSelect').append('<div class="chatRoom"></div>');
};

app.addFriend = function(username) {

};


app.handleSubmit = function(){

};






